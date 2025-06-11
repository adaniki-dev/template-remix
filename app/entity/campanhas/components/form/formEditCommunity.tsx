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

interface CommunityValues {
  name: string;
  position: number;
  description: string;
  image?: string;
  memberLimit: number;
  isLeadCaptureActive: boolean;
}

function createInstancesWithCommunity(groupIds: string[], values: CommunityValues) {
  return groupIds.reduce(
    (acc, groupId, index) => {
      const groupName = values.name.replace('${index}', (values.position + index).toString());

      return {
        ...acc,
        ...(values.description && { description: values.description }),
        ...(values.name && { name: groupName }),
        isLeadCaptureActive: values.isLeadCaptureActive,
        memberLimit: values.memberLimit,
        ...(values.image && { image: values.image }),
      };
    },
    {} as Record<string, any>,
  );
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

export default function FormEditCommunity({ handleCloseModal }: any) {
  const { editGroupsIds } = useGroupStore();
  const { editCommunity } = useGroupActions();
  const params = useParams();
  return (
    <MyForm
      initialValues={{
        position: 1,
        name: '',
        description: '',
        image: '',
        memberLimit: 3000,
        isLeadCaptureActive: false,
      }}
      onSubmit={(values, actions) => {
        const data = createInstancesWithCommunity(editGroupsIds.groupIds, values);
        const body = {
          campaignsId: params.campaignsId as string,
          community: data,
          ids: editGroupsIds.groupIds,
        };
        editCommunity(body, {
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
              placeholder="Nome da comunidade (use ${index} para numerar a posição)"
              label="Nome da comunidade (use ${index} para numerar a posição)"
            />
            <InputField name="description" placeholder="Insira sua descrição" label="Descrição" />
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
                placeholder="Posição do comunidade"
                label="Começar a partir desta posição"
                type="number"
                min={1}
              />
              <InputField
                name="memberLimit"
                placeholder="Limite de membros"
                label="Limite de membros (max: 3000)"
                max={3000}
                min={1}
                type="number"
              />
            </div>
            <Separator className="my-6" />
            <div className="grid grid-cols-2 gap-6">
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
