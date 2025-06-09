import React from 'react';
import InputField from '@/components/ui-modified/inputField';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import MyForm from '@/lib/Formik/Form';
import InputFieldSwitchHorizontalCheckBox from '@/components/ui-modified/horizontalInputField/InputFieldSwitchHorizontal';
import { useGroupActions } from '@/features/campanhas/hooks/useActionsGroups';
import { useGroupStore } from '@/features/campanhas/hooks/useStoreGroups';
import { Separator } from '@/components/ui/separator';
import FormsLoadings from '@/components/ui/loadings/formsLoadings';
import ImageGalleryField from '@/features/galeria/components/imageList/inputFieldGallery';
interface GroupValues {
  name: string;
  position: number;
  image?: string;
  memberLimit: number;
  isLeadCaptureActive: boolean;
  canMessageAdmin: boolean;
  canChangeSettingsAdmin: boolean;
}

function createInstancesWithGroups(groupIds: string[], values: GroupValues) {
  const groups = groupIds.map((groupId, index) => {
    const groupName = values.name.replace('${index}', (values.position + index).toString());

    return {
      id: groupId,
      ...(values.name && { name: groupName }),
      isLeadCaptureActive: values.isLeadCaptureActive,
      canMessageAdmin: values.canMessageAdmin,
      canChangeSettingsAdmin: values.canChangeSettingsAdmin,
      memberLimit: values.memberLimit,
      ...(values.image && { image: values.image }),
    };
  });

  return groups;
}

function PreviewName({ value, position }: any) {
  if (!value) return null;

  const previewName = value.replace('${index}', position);

  return (
    <div className="grid gap-2">
      <p className="text-sm">Pre-visualização</p>
      <p className="px-3 text-sm py-1 rounded-lg border">{previewName}</p>
    </div>
  );
}

export default function FormEditGroup({ handleCloseModal }: any) {
  const { editGroupsIds } = useGroupStore();
  const { editGroups } = useGroupActions();
  const params = useParams();
  return (
    <MyForm
      initialValues={{
        position: 1,
        name: '',
        image: '',
        memberLimit: 1024,
        isLeadCaptureActive: false,
        canMessageAdmin: false,
        canChangeSettingsAdmin: false,
        can_add_member_mode: false
      }}
      onSubmit={(values, actions) => {
        const data = createInstancesWithGroups(editGroupsIds.groupIds, values);
        const body = {
          campaignsId: params.campaignsId as string,
          groups: data,
        };
        editGroups(body, {
          onSuccess: () => {
            handleCloseModal();
          },
          onSettled: () => {
            actions.setSubmitting(false);
          },
        });
      }}
    >
      {({ values, isSubmitting }) => (
        <div className="grid gap-4 transition-all">
          <div className="grid gap-3">
            <InputField
              name="name"
              placeholder="Nome do grupo (use ${index} para numerar a posição)"
              label="Nome do grupo (use ${index} para numerar a posição)"
            />
            <div>
              <ImageGalleryField
                name="image"
                placeholder="Coloque a URL da imagem"
                label="URL da imagem"
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
                name="memberLimit"
                placeholder="Limite de membros"
                label="Limite de membros (max: 1024)"
                max={1024}
                min={1}
                type="number"
              />
            </div>
            <Separator className="my-6" />

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
            <Separator className="my-6" />

            {values.name && <PreviewName value={values.name} position={values.position} />}
          </div>

          <Button disabled={isSubmitting} type="submit">
            Salvar
          </Button>
          <FormsLoadings
            isSubmitting={isSubmitting}
            message="Estamos enviando suas informações, para fila para que possamos processar"
          />
        </div>
      )}
    </MyForm>
  );
}
