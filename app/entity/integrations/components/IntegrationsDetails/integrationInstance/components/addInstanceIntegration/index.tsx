'use client';

import InputBadgeWithSelect from '@/components/ui-modified/InputBadgeWithSelect';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import MyForm from '@/lib/Formik/Form';
import extractWhatsAppNumbers from '@/util/extractWhatsAppNumbers';
import { formatPhoneNumber } from '@/util/formatPhoneNumber';
import { removeSearchParamsInURL } from '@/util/removeSearchParamsInURL';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useApiQuery } from '@/core/useAPI';
import { useIntegrationsActions } from '@/features/integrations/hooks/useIntegrationsActions';
import { toast } from 'sonner';

export function instanceInInput() {
  const { data, isLoading, isError } = useApiQuery<any>(['instances'], 'instance/all');
  const [optionsInstances, setOptionsInstances] = useState([]);

  useEffect(() => {
    if (data && !isError) {
      if (data?.length === 0 && !data.error) return;
      if (data?.length > 0) {
        const instanceEnabled = data?.filter((item: any) => item?.isEnabled);
        const instanceWithOnlyPhone = instanceEnabled?.filter((item: any) => item.phone);
        const instances = instanceWithOnlyPhone?.map((item: any) => {
          return {
            label: `${formatPhoneNumber(extractWhatsAppNumbers(item.phone))}`,
            value: item.id,
            client_integration_id: item.client_integration_id,
          };
        });
        if (!instances) return;
        if (instances?.length === 0) return;
        const filteredInstances = instances.filter((item: any) => !item.client_integration_id);
        setOptionsInstances(filteredInstances);
      }
    }
  }, [data]);

  return {
    data,
    isLoading,
    isError,
    optionsInstances,
  };
}

export default function AddInstanceIntegration() {
  const searchParams = useSearchParams();
  const params = useParams();
  const AddingInstanceOnIntegration = searchParams.get('AddingInstanceOnIntegration');
  const [openModal, setOpenModal] = useState(false);
  const { addingInstanceOnIntegration } = useIntegrationsActions();
  const { data, isError, isLoading, optionsInstances } = instanceInInput();

  useEffect(() => {
    if (AddingInstanceOnIntegration === 'y') {
      setOpenModal(true);
    }
  }, [AddingInstanceOnIntegration, setOpenModal]);

  function handleCloseModal() {
    setOpenModal(!openModal);
    removeSearchParamsInURL('AddingInstanceOnIntegration');
  }

  return (
    <Dialog open={openModal} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicione Instâncias a sua integração</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div>
          {isLoading && (
            <div className="h-40 rounded-lg border border-primary flex items-center justify-center">
              <p>Carregando formulário</p>
            </div>
          )}
          {isError && (
            <div className="h-40 rounded-lg border border-red-500 flex items-center justify-center">
              <p>Ocorreu um erro ao carregar as instâncias</p>
            </div>
          )}
          {data && optionsInstances && optionsInstances.length === 0 && (
            <div className="h-40 rounded-lg border border-primary flex items-center justify-center">
              <p>Nenhuma instância disponível</p>
            </div>
          )}
          {data && optionsInstances && optionsInstances.length > 0 && (
            <MyForm
              initialValues={{
                instances: [],
              }}
              onSubmit={(values, actions) => {
                actions.setSubmitting(true);
                addingInstanceOnIntegration(
                  {
                    clientIntegrationId: params.clientIntegrationId!,
                    instance_ids: values.instances,
                  },
                  {
                    onSuccess: () => {
                      toast.success('Instâncias adicionadas com sucesso');
                      handleCloseModal();
                    },
                    onSettled: () => {
                      actions.setSubmitting(false);
                    },
                  },
                );
              }}
            >
              {({ isSubmitting }) => (
                <div className="grid gap-3 w-full">
                  <InputBadgeWithSelect
                    label="Adicione instâncias a sua integração"
                    name="instances"
                    title="Adicione instâncias"
                    search="procure por instâncias"
                    emptyList="Nenhuma instância encontrada"
                    options={optionsInstances}
                    placeholder="Selecione uma instância"
                    required
                  />
                  <Button disabled={isSubmitting} type="submit">
                    {' '}
                    Adicionar Instâncias{' '}
                  </Button>
                </div>
              )}
            </MyForm>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
