'use client';
import InputField from '@/components/ui-modified/inputField';
import InputFieldSelect from '@/components/ui-modified/InputFieldSelect';
import { Button } from '@/components/ui/button';
import { useChannelsContext } from '@/features/canais/context/channelsProvider';
import { useChannelsOperations } from '@/features/canais/hooks/useChannelsOperations';
import MyForm from '@/lib/Formik/Form';
import { formikValidationSchema } from '@/lib/FormikValidationSchema';
import extractWhatsAppNumbers from '@/util/extractWhatsAppNumbers';
import { formatPhoneNumber } from '@/util/formatPhoneNumber';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { z } from 'zod';

const FormCreateChannelsSchema = z.object({
  instanceId: z.string({ required_error: 'Adicione pelo menos uma instância' }),
  name: z.string({ required_error: 'Nome do seu canal é obrigatório' }),
});

export default function FormCreateChannels({ handleCloseModal }: any) {
  const { queryInstances } = useChannelsContext();
  const { addChannels } = useChannelsOperations();
  const [optionsInstances, setOptionsInstances] = useState([]);
  const { data } = queryInstances;

  useEffect(() => {
    if (data) {
      if (data?.length === 0) return;
      const isntancesEnabled = data?.filter(
        (item: any) => item.phone && item.provider === 'autonotify' && item.isEnabled,
      );

      const instances = isntancesEnabled?.map((item: any) => {
        return {
          label: `${formatPhoneNumber(extractWhatsAppNumbers(item.phone))}`,
          value: item.id,
        };
      });
      if (!instances) return;
      if (instances?.length === 0) return;

      setOptionsInstances(instances);
    }
  }, [data]);

  if (!optionsInstances || optionsInstances.length === 0)
    return (
      <div className="flex flex-col items-center justify-center gap-2 w-full border rounded-lg px-3 py-2">
        <p>Não foram identificadas instancias com conexão com telefone</p>
        <p>Por favor, crie uma nova instância ou conecte a um telefone</p>
        <Link href={'/dashboard/instancia'} className="bg-primary px-4 py-2 rounded-lg text-white">
          Criar nova instância ou conectar a uma
        </Link>
      </div>
    );

  return (
    <MyForm
      initialValues={{
        instanceId: '',
        name: '',
      }}
      validationSchema={formikValidationSchema(FormCreateChannelsSchema)}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        const body = {
          name: values.name,
          instanceId: values.instanceId,
        };
        addChannels(body, {
          onSuccess: () => {
            handleCloseModal();
          },
          onSettled: () => {
            actions.setSubmitting(false);
          },
        });
      }}
    >
      {({ values, isSubmitting }) => {
        return (
          <div className="grid gap-2">
            <InputField
              label="Nome do seu canal"
              name="name"
              placeholder="Nome do seu canal"
              required
            />
            <InputFieldSelect
              label="Instância"
              name="instanceId"
              options={optionsInstances}
              placeholder="Selecione uma instância"
            />
            {isSubmitting && (
              <div className="bg-radial-gradient inset-0 w-full h-full absolute flex flex-col items-center justify-center gap-3 transition-all ease-out duration-300">
                <AiOutlineLoading className="text-4xl animate-spin text-primary" />
                <p className="text-lg">Estamos enviando suas alterações</p>
              </div>
            )}
            <Button disabled={isSubmitting} variant="outline" type="submit">
              {isSubmitting ? 'Criando...' : 'Criar'}
            </Button>
          </div>
        );
      }}
    </MyForm>
  );
}
