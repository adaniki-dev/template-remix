'use client';
import InputDatePickerField from '@/components/ui-modified/datePicker';
import InputField from '@/components/ui-modified/inputField';
import InputFieldCheckBoxGroup from '@/components/ui-modified/inputFieldCheckBoxGroup';
import { Button } from '@/components/ui/button';
import { useCampaignOperations } from '@/features/campanhas/hooks/useCampaignOperations';
import MyForm from '@/lib/Formik/Form';
import { formikValidationSchema } from '@/lib/FormikValidationSchema';
import formatarData from '@/util/formatDate';
import { subDays, addDays } from 'date-fns';
import { AiOutlineLoading } from 'react-icons/ai';
import { toast } from 'sonner';
import { z } from 'zod';

const FormCreateCampaignsSchema = z.object({
  title: z.string({ required_error: 'Título da sua campanha é obrigatório' }),
});

export default function FormEditCampaigns({ handleCloseModal, campaign }: any) {
  const oneDayAgo = subDays(new Date(), 1);
  const { editCampaigns } = useCampaignOperations();
  function handleSubmit(values: any, actions: any) {
    const loading = toast.loading('Editando campanha...');
    actions.setSubmitting(true);
    editCampaigns(values, {
      onSuccess: async () => {
        handleCloseModal();
      },
      onSettled() {
        actions.setSubmitting(false);
      },
    });
  }

  return (
    <MyForm
      initialValues={{
        id: campaign?.id || '',
        startedIn: new Date(campaign?.startedIn),
        finishedAt: new Date(campaign?.finishedAt),
        description: campaign?.description || '',
        title: campaign?.title || '',
        type: campaign?.finishedAt ? ['true'] : [],
      }}
      validationSchema={formikValidationSchema(FormCreateCampaignsSchema)}
      onSubmit={(values, actions) => {
        const finish = new Date(values.finishedAt) as any;
        const body = {
          campaigns: [
            {
              id: values.id,
              title: values.title,
              description: values.description,
              ...(values.type[0] === 'true' && {
                finishedAt: formatarData(finish, true),
                toChangeFinishedtAt: true,
              }),
              ...(values.type[0] === 'false' && { toChangeFinishedtAt: true, finishedAt: null }),
            },
          ],
        };
        handleSubmit(body, actions);
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
            <div className="grid grid-cols-2 gap-2 mt-2">
              <InputFieldCheckBoxGroup
                label=""
                name="type"
                options={[{ label: 'Adicionar data de finalização', value: 'true' }]}
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
            {isSubmitting && (
              <div className="bg-radial-gradient inset-0 w-full h-full absolute flex flex-col items-center justify-center gap-3 transition-all ease-out duration-300">
                <AiOutlineLoading className="text-4xl animate-spin text-primary" />
                <p className="text-lg">Estamos enviando suas alterações</p>
              </div>
            )}

            <Button variant="outline" type="submit">
              {isSubmitting ? 'Editando...' : 'Editar'}
            </Button>
          </div>
        );
      }}
    </MyForm>
  );
}
