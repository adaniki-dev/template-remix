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
import { useApiQuery } from '@/core/useAPI';
import { useCampaignsByIdContext } from '@/features/campanhas/context/campaignsByIdContext';
import { useCampaignOperations } from '@/features/campanhas/hooks/useCampaignOperations';
import MyForm from '@/lib/Formik/Form';
import extractWhatsAppNumbers from '@/util/extractWhatsAppNumbers';
import { formatPhoneNumber } from '@/util/formatPhoneNumber';
import { removeSearchParamsInURL } from '@/util/removeSearchParamsInURL';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AddInstanceOnCampaignDialog() {
  const searchParams = useSearchParams();
  const AddingInstance = searchParams.get('AddingInstance');
  const [openModal, setOpenModal] = useState(false);
  const [optionsInstances, setOptionsInstances] = useState([]);
  const { campaignsId } = useCampaignsByIdContext();
  const { addInstanceOnCampaign } = useCampaignOperations();

  useEffect(() => {
    if (AddingInstance === 'y') {
      setOpenModal(true);
    }
  }, [AddingInstance, setOpenModal]);
  const { data, isLoading, isError } = useApiQuery<any>(['instances'], 'instance/all');

  useEffect(() => {
    if (data && !isError) {
      if (data?.length === 0 && !data.error) return;
      if (data?.length > 0) {
        const instanceWithOnlyPhone = data?.filter((item: any) => item.phone);
        const instances = instanceWithOnlyPhone?.map((item: any) => {
          return {
            label: `${formatPhoneNumber(extractWhatsAppNumbers(item.phone))}`,
            value: item.id,
            campaignId: item.campaignId,
          };
        });
        if (!instances) return;
        if (instances?.length === 0) return;
        const filteredInstances = instances.filter((item: any) => !item.campaignId);
        setOptionsInstances(filteredInstances);
      }
    }
  }, [data]);

  function handleCloseModal() {
    setOpenModal(!openModal);
    removeSearchParamsInURL('AddingInstance');
  }

  return (
    <Dialog open={openModal} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicione Instâncias a sua campanha</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Adicionando novas instância, você aumenta a capacidade maxima de grupos.
        </DialogDescription>
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
                addInstanceOnCampaign(
                  {
                    campaignId: campaignsId,
                    instances: values.instances,
                  },
                  {
                    onSuccess: () => {
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
                    label="Adicione instâncias a sua campanha"
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
