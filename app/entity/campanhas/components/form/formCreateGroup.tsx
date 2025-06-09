'use client';

import InputFieldSwitchHorizontalCheckBox from '@/components/ui-modified/horizontalInputField/InputFieldSwitchHorizontal';
import InputField from '@/components/ui-modified/inputField';
import InputFieldSelect from '@/components/ui-modified/InputFieldSelect';
import { Button } from '@/components/ui/button';
import FormsLoadings from '@/components/ui/loadings/formsLoadings';
import { Separator } from '@/components/ui/separator';
import { useApiQuery } from '@/core/useAPI';
import ImageGalleryField from '@/features/galeria/components/imageList/inputFieldGallery';
import InputFieldAdminParticipants from '@/features/campanhas/components/form/InputCheckBoxAdminsParticipants';
import InputNumberValidation from '@/features/campanhas/components/form/inputNumberValidation';
import { useGroupActions } from '@/features/campanhas/hooks/useActionsGroups';
import MyForm from '@/lib/Formik/Form';
import toast from '@/lib/Toast/toast';
import extractWhatsAppNumbers from '@/util/extractWhatsAppNumbers';
import { formatPhoneNumber } from '@/util/formatPhoneNumber';
import { useParams } from 'next/navigation';
import { Fragment, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { GoAlertFill } from 'react-icons/go';

function PreviewName({ value, position }: any) {
  if (!value) return null;

  const previewName = value.replace('${index}', position);

  return (
    <div className="grid gap-2">
      <p>Pre-visualização</p>
      <p className="px-3 py-2 rounded-lg border">{previewName}</p>
    </div>
  );
}

export default function FormCreateGroup({ handleCloseModal }: any) {
  const { createGroups } = useGroupActions();
  const params = useParams<{ campaignsId: string }>();
  const [dangersOptions, setDangersOptions] = useState<any>(false);

  const { data } = useApiQuery<any>(
    ['InstancesCampaigns', params.campaignsId],
    `/instance/all/campaign?campaignsId=${params.campaignsId}&isEnabled=true`,
  );

  function verifyAndFormatPhone(phone: string): string {
    const regex = /^(\d{2})(9)(\d{8})$/;
    const match = phone.match(regex);
    if (match) {
      return `${match[1]}${match[3]}`;
    }
    return phone;
  }

  const instancesOptions = (data: any) => {
    if (data && data?.length > 0) {
      const filteredData = data.filter((instance: any) => instance);
      if (filteredData.length === 0) {
        return [
          {
            label: 'Nenhuma instância disponível para criar grupos',
            value: 'none',
          },
        ];
      }
      return filteredData.map((instance: any) => ({
        label: instance?.phone
          ? formatPhoneNumber(extractWhatsAppNumbers(instance.phone))
          : instance.instanceKey,
        value: instance.id,
      }));
    }
    return [
      {
        label: 'Nenhuma instância disponível para criar grupos',
        value: 'none',
      },
    ];
  };

  const findIsBackupInstance = (data: any) => {
    if (data && data.length > 0) {
      const filteredData = data.filter((instance: any) => instance.isBackup === true);
      const backupNumbers = filteredData.map((instance: any) => instance.id);
      return backupNumbers;
    }
    return [];
  };

  function handleSubmit(values: any, actions: any) {
    if (values.instanceId === '' || values.instanceId === 'none') {
      toast.error('Selecione uma instância');
      actions.setSubmitting(false);
      return;
    }
    if (values.membersList.length === 0) {
      toast.error('Adicione participantes para criar grupos');
      actions.setSubmitting(false);
      return;
    }
    if (values.invalidMembers.length >= values.membersList.length) {
      toast.error('Adicione pelo menos um número válido para criar grupos');
      actions.setSubmitting(false);
      return;
    }
    if (
      (values.invalidMembers.length > 0 && dangersOptions === false) ||
      (values.memberLimit > 600 && dangersOptions === false)
    ) {
      setDangersOptions(true);
      actions.setSubmitting(false);
      return;
    }

    const canChangeSettingsAdmin = values.adminsOptions.includes('canChangeSettingsAdmin');
    const canMessageAdmin = values.adminsOptions.includes('canMessageAdmin');
    actions.setSubmitting(true);

    const createAdmins = (membersList: string[], admins: string[]) => {
      return membersList.map((member) => ({
        phone: '55' + verifyAndFormatPhone(member),
        toAdmin: admins.includes(member),
      }));
    };
    const participants = values.membersList.filter(
      (member: string) => !values.invalidMembers.includes(member),
    );
    const admins = values.admins;
    const adminsList = createAdmins(participants, admins);
    const backupNumbers = findIsBackupInstance(data?.data);
    const groups = Array.from({ length: values.qtn }, (_, i) => {
      const groupName = values.name.replace('${index}', (values.position + i).toString());

      return {
        name: groupName,
        isLeadCaptureActive: values.isLeadCaptureActive === 'true' ? true : false,
        memberLimit: values.memberLimit,
        canChangeSettingsAdmin,
        canMessageAdmin,
        ...(values.image && { image: values.image }),
      }; 
    });

    createGroups(
      {
        instanceId: values.instanceId,
        campaignsId: params.campaignsId,
        participants: adminsList,
        ...(backupNumbers.length > 0 && { backups: backupNumbers }),
        groups,
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
  }

  return (
    <MyForm
      enableReinitialize={true}
      initialValues={{
        instanceId: '',
        name: '',
        isLeadCaptureActive: 'false',
        image: '',
        memberLimit: 600,
        membersList: [],
        participants: [],
        qtn: 1,
        position: 1,
        admins: [],
        adminsOptions: [],
        canMessageAdmin: false,
        canChangeSettingsAdmin: false,
        invalidMembers: [],
      }}
      onSubmit={(values, actions) => {
        handleSubmit(values, actions);
      }}
    >
      {({ values, isSubmitting }) => (
        <Fragment>
          {!dangersOptions && (
            <Fragment>
              {instancesOptions(data?.data) && (
                <div className="flex flex-col gap-4">
                  <div className="grid gap-4 h-[78vh] overflow-auto">
                    <div className="grid gap-2">
                      <InputFieldSelect
                        name="instanceId"
                        label="Instância de Whatsapp com grupos disponíveis"
                        placeholder="Selecione a instância"
                        options={instancesOptions(data?.data)}
                      />
                      <Separator className="my-4" />
                      <ImageGalleryField
                        name="image"
                        placeholder="Coloque a URL da imagem"
                        label="URL da imagem"
                      />
                      <Separator className="my-4" />
                      <div className="grid grid-cols-2 gap-2">
                        <InputField
                          name="name"
                          placeholder="Nome do grupo (use ${index} para numerar)"
                          label="Nome do grupo (use ${index} para numerar)"
                          required
                        />
                        <InputField
                          name="memberLimit"
                          placeholder="Limite de membros"
                          label="Limite de membros recomendado: 600"
                          max={1024}
                          min={1}
                          type="number"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <InputField
                          name="position"
                          placeholder="Posição do grupo"
                          label="Começar a partir desta posição"
                          type="number"
                          min={1}
                        />
                        <InputField
                          name="qtn"
                          placeholder="Quantidade de grupos"
                          label="Quantidade de grupos max: 10 por vez"
                          max={10}
                          min={1}
                          type="number"
                        />
                      </div>
                      <Separator className="my-4" />

                      <div className="grid grid-cols-2 gap-6">
                        <div className="grid gap-3">
                          <p className="font-medium text-sm">Apenas admins:</p>
                          <div className="grid gap-2">
                            <InputFieldSwitchHorizontalCheckBox
                              name="canMessageAdmin"
                              label="Podem enviar mensagens"
                            />
                            <InputFieldSwitchHorizontalCheckBox
                              name="canChangeSettingsAdmin"
                              label="Podem alterar configurações"
                            />
                          </div>
                        </div>
                        <InputFieldSwitchHorizontalCheckBox
                          name="isLeadCaptureActive"
                          label="Ativar captação de leads"
                        />
                      </div>
                      <Separator className="my-4" />
                      <div className="grid gap-2">
                        <span className="bg-yellow-300/30 py-2 px-4 rounded-lg flex items-center">
                          <GoAlertFill className="text-3xl inline-block mr-4 text-yellow-500" />
                          <p className="text-sm">
                            Obrigatório adicionar pelo menos 1 participante, e deve estar na lista
                            de contato do Whatsapp para ser adicionado.
                          </p>
                        </span>
                        <InputNumberValidation
                          name="membersList"
                          label="Participantes"
                          placeholder="Digite o número do telefone"
                        />
                      </div>

                      {values.membersList?.length > 0 && (
                        <InputFieldAdminParticipants
                          name="admins"
                          label="Quais participantes serão administradores?"
                          orientation="horizontal"
                          options={values.membersList.map((participant: string) => ({
                            value: participant,
                            label: formatPhoneNumber(participant),
                          }))}
                        />
                      )}

                      {values.name && (
                        <PreviewName value={values.name} position={values.position} />
                      )}
                    </div>

                    {isSubmitting && (
                      <div className="bg-radial-gradient inset-0 w-full h-full absolute flex flex-col items-center justify-center gap-3">
                        <AiOutlineLoading className="text-4xl animate-spin text-primary" />
                        <p className="text-lg">
                          Estamos criando seus grupos, isso pode levar alguns segundos
                        </p>
                      </div>
                    )}
                  </div>

                  <Button disabled={isSubmitting} type="submit">
                    Criar grupos
                  </Button>
                </div>
              )}
            </Fragment>
          )}
          {dangersOptions && (
            <div className="grid gap-4">
              {values.memberLimit > 600 && (
                <div className="bg-yellow-300/40 rounded-md shadow items-center justify-center gap-3 py-4 px-8">
                  <GoAlertFill className="text-3xl text-yellow-500" />
                  <p>
                    Recomendamos que utilize um limite de <strong>600</strong> membros por grupo,
                    para garantir a estabilidade do Whatsapp
                  </p>
                </div>
              )}
              {values.invalidMembers.length > 0 && (
                <div className="bg-yellow-300/40 rounded-md shadow items-center justify-center gap-3 py-4 px-8">
                  <GoAlertFill className="text-3xl text-yellow-500" />
                  <p>
                    Os seguintes números não foram encontrados no Whatsapp, por favor, verifique se
                    estão corretos. Caso deseje continuar mesmo, eles serão ignorados
                  </p>
                  {values.invalidMembers.map((member: string) => (
                    <p key={member}>
                      <strong>{formatPhoneNumber(member)}</strong>
                    </p>
                  ))}
                </div>
              )}
              <div className="grid gap-4">
                <Button disabled={isSubmitting} type="submit" variant="destructive">
                  Continuar mesmo assim
                </Button>
                <Button type="button" onClick={() => setDangersOptions(false)}>
                  Corrigir
                </Button>
              </div>
              <FormsLoadings
                isSubmitting={isSubmitting}
                message="Estamos enviando seu grupos para criação"
              />
            </div>
          )}
        </Fragment>
      )}
    </MyForm>
  );
}
