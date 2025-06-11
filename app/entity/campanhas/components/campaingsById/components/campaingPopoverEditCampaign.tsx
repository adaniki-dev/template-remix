import InputField from '@/components/ui-modified/inputField';
import InputFieldRadioGroup from '@/components/ui-modified/inputFieldRadioGroup';
import InputFieldSelect from '@/components/ui-modified/InputFieldSelect';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApiMutation, useApiQuery } from '@/core/useAPI';
import InputNumberValidation from '@/features/campanhas/components/form/inputNumberValidation';
import { useCampaignsByIdContext } from '@/features/campanhas/context/campaignsByIdContext';
import MyForm from '@/lib/Formik/Form';
import { useQueryClient } from '@tanstack/react-query';
import { useField, useFormikContext } from 'formik';
import { set } from 'lodash';
import { BadgeAlert, BadgeCheck } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { toast } from 'sonner';

type changeStrategy = {
  type: 'balanced' | 'sequential';
};

function NumberIsValid({ phone, values }: any) {
  const { setFieldValue } = useFormikContext();
  const [isValid, setIsValid] = useState(false);

  function formatPhoneNumber(phone: string): string {
    const digits = phone.replace(/\D/g, '');

    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
  }

  function removePhones(phone: string) {
    setFieldValue(
      'backupParticipants',
      values.backupParticipants.filter((item: string) => item !== phone),
    );
    if (!isValid) {
      setFieldValue(
        'invalidNumbers',
        values.invalidNumbers.filter((item: string) => item !== phone),
      );
    }
  }

  function verifyAndFormatPhone(phone: string): string {
    const regex = /^(\d{2})(9)(\d{8})$/;
    const match = phone.match(regex);
    if (match) {
      return `${match[1]}${match[3]}`;
    }
    return phone;
  }

  const { isError, isLoading, isSuccess } = useApiQuery(
    ['validatePhone', phone],
    `/groups/validate/phone?phone=${'55' + verifyAndFormatPhone(phone)}`,
    {
      enabled: !!phone,
      retry: false,
    },
  );

  useEffect(() => {
    if (isError) {
      toast.error(`Número não encontrado no WhatsApp: ${phone}`, {
        duration: 10000,
        icon: <BadgeAlert className="text-red-500" />,
      });
      setFieldValue('invalidNumbers', [...values.invalidNumbers, phone]);
    } else {
      setIsValid(true);
    }
  }, [isError]);

  return (
    <div className="flex items-center justify-between text-sm border gap-2 rounded-md px-2 py-1">
      <div className="flex gap-2 items-center">
        {isLoading && <AiOutlineLoading className="animate-spin" />}
        {isError && <BadgeAlert className="text-red-500" />}
        {isSuccess && <BadgeCheck className="text-green-500" />}
        <p className="text=xs">{formatPhoneNumber(phone)}</p>
      </div>
      <Button
        onClick={() => removePhones(phone)}
        variant="destructive"
        size="sm"
        className="h-4 w-4"
      >
        X
      </Button>
    </div>
  );
}

function BackupViewer({ values }: any) {
  return (
    <div className="grid gap-2">
      {values.backupParticipants.map((phone: string, index: number) => (
        <NumberIsValid key={index} phone={phone} values={values} />
      ))}
    </div>
  );
}

export function PopoverEditCampaigns() {
  const [isOpen, setIsOpen] = useState(false);
  const { queryCampaignsById } = useCampaignsByIdContext();
  const { data } = queryCampaignsById;
  const queryClient = useQueryClient();
  const params = useParams();

  const editCampaigns = useApiMutation<
    any,
    {
      campaigns: [
        {
          id: string;
          title: string;
          description: string;
        },
      ];
    }
  >('/campaigns', 'patch', {
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ['campaignsById', params.campaignsId],
      });
      toast.success('Campanha editada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao editar campanha!');
    },
  });

  const changeStrategy = useApiMutation<any, changeStrategy>(
    `/campaigns/fill/strategy?campaignsId=${params.campaignsId}`,
    'patch',
    {
      onSuccess: () => {
        toast.success('Estratégia alterada com sucesso!');
        queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      },
    },
  );

  const backupCount = useApiMutation<
    any,
    {
      backupCount: number;
      campaignsId: string;
      backupName: string;
      action: 'addParticipant';
      backupParticipants: string[];
    }
  >(`/campaigns/backup/count`, 'patch', {
    onSuccess: () => {
      toast.success('Backup adicionado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <Button size="sm">Configurações</Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <Tabs defaultValue="configuration">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="configuration">
              Configurações
            </TabsTrigger>
            <TabsTrigger className="w-full" value="edit">
              Edição
            </TabsTrigger>
          </TabsList>
          <TabsContent value="configuration" className="w-full">
            <MyForm
              initialValues={{
                title: data?.title || '',
                description: data?.description || '',
                strategy: data?.fillStrategy || 'sequential',
                backupCount: data?.backupCount || '0',
                backupName: data?.backupName || '',
                backupParticipants: data?.backupParticipants || [],
                invalidNumbers: [],
              }}
              onSubmit={async (values, actions) => {
                if (
                  values.title !== '' &&
                  values.description !== '' &&
                  data.title !== values.title &&
                  data.description !== values.description
                ) {
                  await editCampaigns.mutateAsync({
                    campaigns: [
                      {
                        id: params.campaignsId as string,
                        title: values.title,
                        description: values.description,
                      },
                    ],
                  });
                  setIsOpen(false);
                }
                if (data.fillStrategy !== values.strategy) {
                  await changeStrategy.mutateAsync({ type: values.strategy });
                }
                if (
                  Number(values.backupCount) !== 0 ||
                  Number(values.backupCount) !== Number(data.backupCount)
                ) {
                  if (!values.backupName || values.backupParticipants.length === 0) {
                    toast.error('Preencha todos os campos de automação de grupos');
                    return;
                  }
                  if (values.invalidNumbers.length > 0) {
                    toast.error(
                      'Números inválidos não podem ser adicionados ao grupo de contingência',
                    );
                    return;
                  }

                  await backupCount.mutateAsync({
                    backupCount: values.backupCount,
                    campaignsId: params.campaignsId as string,
                    backupName: values.backupName,
                    action: 'addParticipant',
                    backupParticipants: values.backupParticipants,
                  });
                  setIsOpen(false);
                }
                actions.setSubmitting(false);
              }}
            >
              {({ isSubmitting, values }) => {
                return (
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium leading-none">Configure sua campanha</h4>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <InputFieldRadioGroup
                        name="strategy"
                        label="Estratégia de Lead"
                        options={[
                          { label: 'Sequencial', value: 'sequential' },
                          { label: 'Balanceado', value: 'balanced' },
                        ]}
                      />
                      <Separator />
                      <p>Automação de grupos</p>
                      <InputField
                        name="backupName"
                        label="Nome do grupo"
                        placeholder="Nome do grupos criando automaticamente"
                      />
                      <InputNumberValidation
                        name="backupParticipants"
                        label="Participantes"
                        placeholder="Digite o número do telefone"
                      />
                      <BackupViewer values={values} />
                      <InputFieldSelect
                        name="backupCount"
                        label="Grupo de contingencia"
                        placeholder="Grupos serão criados automaticamente"
                        options={[
                          {
                            label: '0',
                            value: '0',
                          },
                          {
                            label: '1',
                            value: '1',
                          },
                          {
                            label: '2',
                            value: '2',
                          },
                          {
                            label: '3',
                            value: '3',
                          },
                          {
                            label: '4',
                            value: '4',
                          },
                          {
                            label: '5',
                            value: '5',
                          },
                        ]}
                      />

                      <Button type="submit" className="text-sm h-8" disabled={isSubmitting}>
                        Alterar
                      </Button>
                    </div>
                  </div>
                );
              }}
            </MyForm>
          </TabsContent>
          <TabsContent value="edit" className="w-full">
            <MyForm
              initialValues={{
                title: data?.title || '',
                description: data?.description || '',
              }}
              onSubmit={async (values, actions) => {
                if (
                  values.title !== '' &&
                  values.description !== '' &&
                  data.title !== values.title &&
                  data.description !== values.description
                ) {
                  await editCampaigns.mutateAsync({
                    campaigns: [
                      {
                        id: params.campaignsId as string,
                        title: values.title,
                        description: values.description,
                      },
                    ],
                  });
                }
                actions.setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => {
                return (
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium leading-none">Configure sua campanha</h4>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <InputField name="title" label="Nome" placeholder="" />
                      <InputField name="description" label="Descrição" placeholder="" />
                      <Button type="submit" className="text-sm h-8" disabled={isSubmitting}>
                        Alterar
                      </Button>
                    </div>
                  </div>
                );
              }}
            </MyForm>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
