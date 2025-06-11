'use client';
import InputDatePickerField from '@/components/ui-modified/datePicker';
import InputBadgeWithSelect from '@/components/ui-modified/InputBadgeWithSelect';
import InputField from '@/components/ui-modified/inputField';
import InputFieldCheckBoxGroup from '@/components/ui-modified/inputFieldCheckBoxGroup';
import { Button } from '@/components/ui/button';
import { useCampaignsContext } from '@/features/campanhas/context/campaignsContext';
import { useCampaignOperations } from '@/features/campanhas/hooks/useCampaignOperations';
import MyForm from '@/lib/Formik/Form';
import { formikValidationSchema } from '@/lib/FormikValidationSchema';
import extractWhatsAppNumbers from '@/util/extractWhatsAppNumbers';
import formatarData from '@/util/formatDate';
import { formatPhoneNumber } from '@/util/formatPhoneNumber';
import { useQueryClient } from '@tanstack/react-query';
import { subDays, addDays } from 'date-fns';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { z } from 'zod';

const FormCreateCampaignsSchema = z.object({
  instances: z.array(z.string({ required_error: 'Adicione pelo menos uma instância' })),
  startedIn: z.date({ required_error: 'Data inicial é obrigatória' }),
  finishedAt: z.date().optional(),
  title: z.string({ required_error: 'Título da sua campanha é obrigatório' }),
});

export default function FormCreateCampaigns({ handleCloseModal }: any) {
  const { queryInstances } = useCampaignsContext();
  const { addCampaigns } = useCampaignOperations();
  const [optionsInstances, setOptionsInstances] = useState([]);
  const data  = queryInstances as any;
  const oneDayAgo = subDays(new Date(), 1);

  useEffect(() => {
    if (data) {
      if (data?.length === 0) return;
      
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
        instances: [],
        startedIn: new Date(),
        finishedAt: '',
        description: '',
        title: '',
        type: [],
      }}
      validationSchema={formikValidationSchema(FormCreateCampaignsSchema)}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        const start = new Date(values.startedIn) as any;
        const finish = new Date(values.finishedAt) as any;
        const body = {
          campaigns: [
            {
              title: values.title,
              description: values.description,
              startedIn: formatarData(start, true),
              ...(values.type[0] === 'true' && { finishedAt: formatarData(finish, true) }),
              instances: values.instances,
            },
          ],
        };
        addCampaigns(body, {
          onSettled() {
            actions.setSubmitting(false);
            handleCloseModal();
          },
        });
      }}
    >
      {({ values, isSubmitting }) => {
        return (
          <div className="grid gap-2">
            <InputField
              label="Título para campanha"
              name="title"
              placeholder="Título para campanha"
              required
            />
            <InputField
              label="Descrição da campanha"
              name="description"
              placeholder="Descrição da campanha"
            />
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
            <div className="grid grid-cols-2 gap-2 mt-2">
              <InputDatePickerField
                label="Data Inicial"
                name="startedIn"
                placeholder="Data Inicial"
                minDate={oneDayAgo}
              />

              {values?.type[0] === 'true' && (
                <InputDatePickerField
                  label="Data final"
                  name="finishedAt"
                  placeholder="Data final"
                  minDate={addDays(values?.startedIn, 1) || oneDayAgo}
                />
              )}
            </div>

            <InputFieldCheckBoxGroup
              label=""
              name="type"
              options={[{ label: 'data de finalização', value: 'true' }]}
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
