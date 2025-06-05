'use client';

import InputField from '@/components/ui-modified/inputField';
import InputRichTextField from '@/components/ui-modified/inputRichText';
import { Button } from '@/components/ui/button';
import MyForm from '@/lib/Formik/Form';
import { formikValidationSchema } from '@/lib/FormikValidationSchema';
import { z } from 'zod';
import InputFieldSelect from '@/components/ui-modified/InputFieldSelect';
import { useQueryClient } from '@tanstack/react-query';
import { postCreateTicket } from '../../services/client/postCreateTicket';
import toast from '@/lib/Toast/toast';
import timeout from '@/util/timeout';
import { useApiMutation, useApiQuery } from '@/core/useAPI';

export default function TicketForm({ handleCloseModal }: any) {
  const { data } = useApiQuery(['departaments'], 'tickets/departments');
  const queryClient = useQueryClient();
  const departaments = data ? data : [];

  const SignupSchema = z
    .object({
      name: z
        .string({ required_error: 'Obrigatório' })
        .min(2, 'Muito curto!')
        .max(50, 'Muito longo!'),
      email: z.string({ required_error: 'Obrigatório' }).email('E-mail inválido'),
      subject: z.string({ required_error: 'Obrigatório' }),
      message: z.string({ required_error: 'Obrigatório' }),
      priority: z.string({ required_error: 'Obrigatório' }),
      deptid: z.string({ required_error: 'Obrigatório' }),
    })
    .superRefine((data, ctx) => {
      if (!data.message || data.message === '<p></p>') {
        ctx.addIssue({
          code: 'custom',
          message: 'Mensagem obrigatória',
          path: ['subject'],
        });
      }
      if (!data.priority) {
        ctx.addIssue({
          code: 'custom',
          message: 'Prioridade obritaória',
          path: ['priority'],
        });
      }
      if (!data.deptid) {
        ctx.addIssue({
          code: 'custom',
          message: 'Departamento obritaório',
          path: ['departament'],
        });
      }
    });

  const translatePriority = (priority: string) => {
    switch (priority) {
      case 'Baixa':
        return 'low';
      case 'Média':
        return 'medium';
      case 'Alta':
        return 'high';
      default:
        return '';
    }
  };

  const priorityOptions = [
    { value: 'Baixa', label: 'Baixa' },
    { value: 'Média', label: 'Média' },
    { value: 'Alta', label: 'Alta' },
  ];

  const departamentOptions = Array.isArray(departaments)
    ? departaments.map((department: any) => ({
        value: department?.id,
        label: department?.name,
      }))
    : [];
  
  const createTicket = useApiMutation<any, {data:FormData}>(
    "tickets", "post",
    {
      onSuccess: async (_data, variables) => {
        await queryClient.invalidateQueries({
          queryKey: ['tickets'],
          refetchType: 'all',
        });
        await timeout(200);
        handleCloseModal();
      },
    },
  )

  const handleTicket = async (values: any, actions: any) => {
    const newData = {
      ...values,
      deptid: values?.deptid ? Number(values?.deptid) : null,
      priority: translatePriority(values.priority),
    };
    const formData = new FormData();
    formData.append('name', newData?.name);
    formData.append('email', newData?.email);
    formData.append('deptid', newData?.deptid);
    formData.append('priority', newData?.priority);
    formData.append('subject', newData?.subject);
    formData.append('message', newData?.message);
    // if (newData?.attachments && newData?.attachments.length > 0) {
    //   newData?.attachments.forEach((file: File) => {
    //     formData.append('attachments', file);
    //   });
    // }
    const loading = toast.loading('Gerando ticket...');
    createTicket.mutateAsync(
      {
        data: formData
      },
      {
        onSuccess: async (_data) => {
          toast.dismiss(loading);
          toast.success('Ticket Gerado com sucesso', {
            id: loading,
          });
          await queryClient.invalidateQueries({
            queryKey: ['tickets'],
            refetchType: 'all',
          });
          await timeout(200);
          handleCloseModal();
        },
        onError(error) {
          toast.error('Erro ao gerar o ticket! Tente mais tarde', {
            id: loading,
          });
        },
        onSettled(_data, _error) {
          actions.setSubmitting(false);
        },
      },
    )
  };

  return (
    <div className="flex items-center justify-center">
      <MyForm
        initialValues={{
          name: '',
          email: '',
          deptid: '',
          priority: '',
          subject: '',
          message: '',
          // attachments: [""],
        }}
        validationSchema={formikValidationSchema(SignupSchema)}
        onSubmit={(values, actions) => {
          const newData = {
            ...values,
            subject: `Autonotify - ${values?.subject}`,
          };
          handleTicket(newData, actions);
        }}
      >
        {({ isSubmitting }) => (
          <div className="w-full max-w-5xl mx-auto bg-transparent">
            <div className=" p-4">
              <h2 className="">Informações do ticket</h2>
              <div className="grid grid-cols-2 gap-3 p-4 w-full">
                <InputField label="Nome" name="name" type="text" placeholder="Digite seu nome" />
                <InputFieldSelect
                  label="Departamento"
                  name="deptid"
                  options={departamentOptions}
                  placeholder="Selecione o departamento"
                />
                <InputField
                  label="E-mail"
                  name="email"
                  type="email"
                  placeholder="Insira seu e-mail"
                />
                <InputFieldSelect
                  label="Prioridade"
                  name="priority"
                  options={priorityOptions}
                  placeholder="Selecione o nivel de prioridade"
                />
              </div>
              <h2 className="">Mensagem</h2>
              <div className="p-4 w-full">
                <InputField
                  label="Assunto"
                  name="subject"
                  type="text"
                  placeholder="Insira o assunto do seu ticket"
                />
                <InputRichTextField
                  label=""
                  name="message"
                  placeholder="Descreva sua solicitação"
                  className="h-[450px]"
                />
              </div>
              {/* <h2 className="text-2xl">Anexos (opcional)</h2>
                <Card className="space-y-2 p-4 rounded-lg shadow-lg w-full">
                  <DragAndDrop name={"attachments"}/>
                </Card> */}
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                Enviar
              </Button>
            </div>
          </div>
        )}
      </MyForm>
    </div>
  );
}
