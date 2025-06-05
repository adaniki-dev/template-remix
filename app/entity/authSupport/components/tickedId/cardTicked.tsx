'use client';

import InputRichTextField from '@/components/ui-modified/inputRichText';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DropDownChangeStatus from '@/features/authSupport/components/tickedId/dropDownChangeStatus';
import { getPriorityDetails } from '@/features/authSupport/components/tickedId/utils/getPriorityDetails';
import { useTicketByIdContext } from '@/features/authSupport/context/ticketIdContext';
import { respondTicketByIdClient } from '@/features/authSupport/services/client/putRespondTicket';
import MyForm from '@/lib/Formik/Form';
import { formikValidationSchema } from '@/lib/FormikValidationSchema';
import toast from '@/lib/Toast/toast';
import { useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import { z } from 'zod';
import { CiWarning } from 'react-icons/ci';
import { useApiMutation } from '@/core/useAPI';

type InfoCardProps = {
  subject: string;
  id: string;
  deptname: string;
  status: string;
  priority: string;
  date: string;
  lastreply: string;
  reply: any;
};

export default function CardTicket({
  subject,
  id,
  deptname,
  priority,
  date,
  lastreply,
  reply,
}: InfoCardProps) {
  const priorityDetails = getPriorityDetails(priority);
  const { queryTicketById } = useTicketByIdContext();
  const data = queryTicketById?.data || null;
  const tickedId = data?.ticketid;
  const queryClient = useQueryClient();
  const SignupSchema = z.object({
    message: z.string({ required_error: 'Obrigatório' }),
  });

  const getUser = (user: any) => {
    const requestor = user?.requestor_type;
    switch (requestor.toLowerCase()) {
      case 'owner':
        return { color: 'bg-gray-200', name: user?.name, date: user?.date };
      case 'operator':
        return { color: 'bg-green-100', name: user?.name, date: user?.date };
    }
  };

  const loading = toast.loading('Enviando resposta');

  const respondTicket = useApiMutation<any, {data:any; actions:any}>(
    "tickets", "put",
    {
      onSuccess: async (_data, variables) => {
        const { actions } = variables
        await queryClient.invalidateQueries({
          queryKey: ['ticketsById'],
          refetchType: 'all',
        });
        toast.success('Status alterado com sucesso!', { id: loading });
        toast.dismiss(loading);
        actions.resetForm();
      },
      onError: (_data, variables) => {
        const { actions } = variables
        actions.setSubmitting(false);
        toast.error('Erro ao alterar status!', { id: loading });
        toast.dismiss(loading);
      },
      onSettled: () => {
        toast.dismiss(loading);
      },
    },
  )

  const handleSubmit = (values: any, actions: any) => {
    actions.setSubmitting(false);
    const newData = {
      message: values?.message,
      ticketid: tickedId,
    };
    respondTicket.mutateAsync(
      {
        data: newData,
        actions
      }
    )
  };

  // const handleDownload = async  (data: any, name: string) => {
  //     const loading = toast.loading("Baixando anexo");
  //     mutate(
  //       {
  //           key: 'attachments',
  //           params: '',
  //           fn: async () => {
  //             const result = await getAttachments(data)
  //             return result
  //           },
  //           refetch: true,
  //       },
  //       {
  //           onSuccess: async (data:any) => {
  //               const blob = new Blob([data]);
  //               const url = window.URL.createObjectURL(blob);
  //               const a = document.createElement('a');
  //               a.href = url;
  //               a.download = name;
  //               document.body.appendChild(a);
  //               a.click();
  //               window.URL.revokeObjectURL(url);
  //               document.body.removeChild(a);
  //               toast.success('Anexo baixado!', { id: loading });
  //               toast.dismiss(loading)
  //           },
  //           onError: () => {
  //               toast.error('Erro ao baixar anexo!', { id: loading });
  //               toast.dismiss(loading)
  //           },
  //           onSettled: () => {
  //               toast.dismiss(loading);
  //           }
  //       },
  //   );
  // };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{subject}</CardTitle>
              <CardDescription>Ticket ID: {id}</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className={`rounded-md p-2 text-xs bg-gray-100 shadow-lg`}>{deptname}</div>
              <DropDownChangeStatus />
              <div className={`${priorityDetails?.color} shadow-lg rounded-md p-2 text-xs`}>
                {priorityDetails?.name}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex justify-between text-gray-400 items-center text-sm text-muted-foreground">
              <div>Gerado: {new Date(date).toLocaleString()}</div>
              <div>Atualizado: {new Date(lastreply).toLocaleString()}</div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Historico do mensagens</h3>
              <div className="flex flex-col gap-4">
                {reply?.length > 0 ? (
                  reply?.map((detail: any, index: any) => {
                    const requestor = getUser(detail);
                    return (
                      <Card
                        className={`whitespace-pre-wrap p-4 gap-2 ${requestor?.color}`}
                        key={index}
                      >
                        <div className="flex flex-row justify-between">
                          <p>Por: {requestor?.name}</p>
                          <p>{new Date(requestor?.date).toLocaleString()}</p>
                        </div>
                        {detail?.message}
                        {/* <div className="flex flex-row mt-3 w-52 gap-2">
                          {detail?.attachments?.map((e: any, index: any) => {
                            const data = {
                              type: detail?.replyid === '0' ? "ticket" : "reply",
                              index: e?.index,
                              relateid: detail?.replyid === '0' ? id : detail?.replyid,
                            }
                            return (
                              <div
                                className="shadow-lg h-10 cursor-pointer bg-white p-1 rounded-md text-sm truncate max-w-full overflow-hidden"
                                key={index}
                                title={e?.filename}
                                onClick={() => handleDownload(data, e?.filename)}
                              >
                                {e?.filename}
                                <div className="flex justify-end">
                                  <RiAttachment2/>
                                </div>
                              </div>
                              )
                          })}
                        </div> */}
                      </Card>
                    );
                  })
                ) : (
                  <div className="w-full flex flex-col justify-center">
                    <div className="w-full bg-white max-w-md mx-auto p-8">
                      <div className="flex flex-col items-center justify-center gap-3 pt-6">
                        <div className="rounded-full bg-blue-100 p-3 mb-4">
                          <CiWarning className="text-red-500" />
                        </div>
                        <p className="text-gray-500">Erro ao buscar historico de mensagens</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Comentários</h3>
              <MyForm
                initialValues={{
                  message: '',
                }}
                validationSchema={formikValidationSchema(SignupSchema)}
                onSubmit={(values, actions) => {
                  handleSubmit(values, actions);
                }}
              >
                {({ isSubmitting }) => (
                  <Fragment>
                    <InputRichTextField label="" name="message" placeholder="" />
                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                      Enviar nova resposta
                    </Button>
                  </Fragment>
                )}
              </MyForm>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
