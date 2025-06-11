'use client';
import Image from 'next/image';
import { useIntegrationsContext } from '../context/integrationContext';
import { DefaultIntegrationForm } from './forms/defaultIntegrationForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MyForm from '@/lib/Formik/Form';
import toast from '@/lib/Toast/toast';
import InputField from '@/components/ui-modified/inputField';
import { useIntegrationsActions } from '@/features/integrations/hooks/useIntegrationsActions';

export default function IntegrationsFormContainer({
  integrationsId,
  token,
  closeModal,
}: {
  integrationsId: string | null;
  token: string;
  closeModal: any;
}) {
  const { findIntegrationById, query } = useIntegrationsContext();
  const { editIntegrations } = useIntegrationsActions();
  if (!integrationsId) return null;
  const integration = findIntegrationById(integrationsId);
  if (!integration) return null;
  const domain = integration?.integrationName?.toLocaleLowerCase() === 'vtex';

  return (
    <div className="flex flex-col">
      <header className=" border-b px-6">
        <div className="pb-4 flex w-full items-center justify-between">
          <div className="items-center grid grid-cols-6 ">
            <Image src={integration?.imageUrl} alt="Page not found" width={46} height={46} />
            <div className="col-span-4 col-start-3">
              <MyForm
                initialValues={{ name: integration?.name, domain: integration?.domain }}
                onSubmit={(values, actions) => {
                  const loading = toast.loading('Atualizando credenciais');
                  actions.setSubmitting(true);
                  editIntegrations(
                    {
                      integrationsId,
                      name: values.name,
                    },
                    {
                      onSuccess: () => {
                        toast.success('Credenciais atualizadas', { id: loading });
                        query.refetch();
                        actions.resetForm();
                        closeModal();
                      },
                      onError: () => {
                        toast.error('Erro ao atualizar credenciais', { id: loading });
                      },
                      onSettled: () => {
                        toast.dismiss(loading);
                        actions.setSubmitting(false);
                      },
                    },
                  );
                }}
              >
                {({ isSubmitting }) => (
                  <div className="space-y-3">
                    <div className="space-y-4">
                      <InputField name="name" label="Nome" placeholder="Nome da Integração" />
                      {domain && <InputField name="domain" label="Domínio" placeholder="Domínio" />}
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      Editar
                    </Button>
                  </div>
                )}
              </MyForm>
            </div>
          </div>
          {/* <Button
            onClick={() => handleAddSearchParamsToUrl('onGuide', integration.id)}
            variant="outline"
          >
            Guia para Integração
          </Button> */}
        </div>
      </header>
      <main className="flex justify-center p-4">
        <Card className="max-w-96 w-full flex">
          <CardContent className="flex flex-col items-center w-full max-w-96">
            <DefaultIntegrationForm token={token} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
