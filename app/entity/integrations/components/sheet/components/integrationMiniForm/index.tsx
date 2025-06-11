'use client';

import InputField from '@/components/ui-modified/inputField';
import { Button } from '@/components/ui/button';
import MyForm from '@/lib/Formik/Form';
import toast from '@/lib/Toast/toast';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import InputBadgeWithSelect from '@/components/ui-modified/InputBadgeWithSelect';
import { z } from 'zod';
import { formikValidationSchema } from '@/lib/FormikValidationSchema';
import { useState } from 'react';
import { instanceInInput } from '../../../IntegrationsDetails/integrationInstance/components/addInstanceIntegration';
import { useIntegrationsActions } from '@/features/integrations/hooks/useIntegrationsActions';

type IntegrationsLinkProps = {
  name: string;
  src: string;
  id: string;
  description: string;
  isEnabled: boolean;
  refetch?: any;
};

export default function IntegrationMiniForm({
  name,
  id,
  src,
  description,
  refetch,
  isEnabled,
}: IntegrationsLinkProps) {
  const domain = name.toLocaleLowerCase() === 'vtex' || name.toLocaleLowerCase() === 'woocommerce';
  const domainRegex = /([^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
  const apiSecret = name.toLocaleLowerCase() === 'shopify';
  const apiSecretRegex = /^[a-zA-Z0-9_-]{8,}$/i;
  const token = name.toLocaleLowerCase() === 'shopify';
  const tokenRegex = /^[a-zA-Z0-9_-]{8,}$/i;
  const [open, setOpen] = useState(false);
  const { optionsInstances } = instanceInInput();
  const { createIntegrations } = useIntegrationsActions();
  const SignupSchema = z.object({
    name: z.string({
      required_error: 'O nome é Obrigatório',
    }),
    domain: domain
      ? z
          .string({ required_error: 'O domínio é obrigatório' })
          .min(1, 'Campo obrigatório quando')
          .regex(domainRegex, {
            message: 'O domínio fornecido é inválido',
          })
      : z.string().optional(),

      apiSecret: apiSecret
      ? z

          .string({ required_error: 'Secret é obrigatório' })
          .min(8, 'O Secret deve ter no mínimo 8 caracteres')
          .regex(apiSecretRegex, {
            message: 'A Secret fornecida é inválida',
          })
      : z.undefined(),
    token: token
      ? z

          .string({ required_error: 'Token é obrigatório' })
          .min(8, 'O token deve ter no mínimo 8 caracteres')
          .regex(tokenRegex, {
            message: 'O token fornecido é inválido',
          })
      : z.undefined(),
  });

  const handleDialog = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={handleDialog} key={id}>
        <DialogTrigger>
          <div className="space-y-3 h-[200px] p-3 flex flex-col shadow-xl items-left border rounded-xl justify-center text-center hover:bg-gray-100 transition-colors">
            <Image className="object-contain" width={27} height={27} alt={name} src={src} />
            <h2 className="text-left font-medium leading-none">{name}</h2>
            <div>
              <p className="text-sm text-left text-muted-foreground">{description}</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Configure {name}</DialogTitle>
          </DialogHeader>
          <div>
            <MyForm
              initialValues={{ name: '', domain: '', instances: [], apiSecret: '', token: '' }}
              validationSchema={formikValidationSchema(SignupSchema)}
              onSubmit={(values, actions) => {
                const loading = toast.loading('Criando token...');

                actions.setSubmitting(true);
                createIntegrations(

                  {
                    integrationId: id,
                    name: values?.name,
                    domain: values?.domain,
                    instances: values?.instances,
                    apiSecret: values?.apiSecret,
                    token: values?.token
                  },
                  {
                    onSuccess: (data: any) => {
                      toast.success('Token criado com sucesso', { id: loading });
                      handleAddSearchParamsToUrl('integrationOpen', data?.id);
                      handleAddSearchParamsToUrl('integrationToken', data?.token);
                      actions.resetForm();
                      handleDialog();
                      refetch();
                    },
                    onError: () => {
                      toast.error('Não foi possível criar o token', {
                        id: loading,
                      });
                      refetch();
                    },
                    onSettled: () => {
                      actions.setSubmitting(false);
                    },
                  },
                );
              }}
            >
              {({ isSubmitting }) => (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <InputField
                      name="name"
                      label="Nome"
                      placeholder="Insira o nome da sua integraçãos"
                    />

                    {domain && (
                      <InputField name="domain" label="Domínio" placeholder="Insira seu domínio" />
                    )}
                    {apiSecret && (
                      <InputField name="apiSecret" type='password' label="Secret" placeholder="Insira sua secret" />
                    )}

                    {token && (
                      <InputField name="token" type='password' label="Token" placeholder="Insira seu token" />
                    )}

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
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    Criar
                  </Button>
                </div>
              )}
            </MyForm>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
