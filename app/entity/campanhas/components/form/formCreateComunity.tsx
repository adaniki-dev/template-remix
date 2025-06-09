'use client';

import InputFieldSwitchHorizontalCheckBox from '@/components/ui-modified/horizontalInputField/InputFieldSwitchHorizontal';
import InputField from '@/components/ui-modified/inputField';
import InputFieldSelect from '@/components/ui-modified/InputFieldSelect';
import { Button } from '@/components/ui/button';
import FormsLoadings from '@/components/ui/loadings/formsLoadings';
import { Separator } from '@/components/ui/separator';
import { useApiQuery } from '@/core/useAPI';
import ImageGalleryField from '@/features/galeria/components/imageList/inputFieldGallery';
import { useGroupActions } from '@/features/campanhas/hooks/useActionsGroups';
import MyForm from '@/lib/Formik/Form';
import toast from '@/lib/Toast/toast';
import extractWhatsAppNumbers from '@/util/extractWhatsAppNumbers';
import { formatPhoneNumber } from '@/util/formatPhoneNumber';
import { useParams } from 'next/navigation';
import { Fragment, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { GoAlertFill } from 'react-icons/go';
import InputFieldTextArea from '@/components/ui-modified/inputFieldTextArea';

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

export default function FormCreateCommunity({ handleCloseModal }: any) {
  const { createComunity } = useGroupActions();
  const params = useParams<{ campaignsId: string }>();
  const [dangersOptions, setDangersOptions] = useState<any>(false);

  const { data } = useApiQuery<any>(
    ['InstancesCampaigns', params.campaignsId],
    `/instance/all/campaign?campaignsId=${params.campaignsId}&isEnabled=true`,
  );
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

  function handleSubmit(values: any, actions: any) {
    if (values.instanceId === '' || values.instanceId === 'none') {
      toast.error('Selecione uma instância');
      actions.setSubmitting(false);
      return;
    }
    actions.setSubmitting(true);
    const community = Array.from({ length: values.qtn }, (_, i) => {
      const communityName = values.name.replace('${index}', (values.position + i).toString());
      return {
        name: communityName,
        description: values.description,
        memberLimit: values.memberLimit,
        isLeadCaptureActive: values.isLeadCaptureActive === 'true' ? true : false,
        ...(values.image !== '' && { image: values.image }),
      };
    });

    createComunity(
      {
        instanceId: values.instanceId,
        campaignsId: params.campaignsId,
        community,
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
        description: '',
        isLeadCaptureActive: 'false',
        image: '',
        memberLimit: 3000,
        position: 1,
        qtn: 1,
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
                        label="Instância de Whatsapp com comunidades disponíveis"
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
                      <div className="max-w-2xl mx-auto p-4">
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-6">
                            <InputFieldSwitchHorizontalCheckBox
                              name="isLeadCaptureActive"
                              label="Ativar captação de leads"
                            />
                          </div>
                          <InputField
                            name="name"
                            placeholder="Nome da comunidade (use ${index} para numerar)"
                            label="Nome da comunidade (use ${index} para numerar)"
                            required
                          />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                              name="position"
                              placeholder="Posição da comunidade"
                              label="Começar a partir desta posição"
                              type="number"
                              min={1}
                            />
                            <InputField
                              name="memberLimit"
                              placeholder="Limite de membros"
                              label="Limite de membros recomendado: 3000"
                              max={3000}
                              min={1}
                              type="number"
                            />
                          </div>
                          <div>
                            <InputFieldTextArea
                              name="description"
                              placeholder="Descreva sua comunidade"
                              label="Descrição"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      {values.name && (
                        <PreviewName value={values.name} position={values.position} />
                      )}
                    </div>
                    {isSubmitting && (
                      <div className="bg-radial-gradient inset-0 w-full h-full absolute flex flex-col items-center justify-center gap-3">
                        <AiOutlineLoading className="text-4xl animate-spin text-primary" />
                        <p className="text-lg">
                          Estamos criando suas comunidades, isso pode levar alguns segundos
                        </p>
                      </div>
                    )}
                  </div>

                  <Button disabled={isSubmitting} type="submit">
                    Criar comunidade
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
                    Recomendamos que utilize um limite de <strong>600</strong> membros por
                    comunidade, para garantir a estabilidade do Whatsapp
                  </p>
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
                message="Estamos enviando sua comunidade para criação"
              />
            </div>
          )}
        </Fragment>
      )}
    </MyForm>
  );
}
