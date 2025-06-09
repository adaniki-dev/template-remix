'use client';

import InputField from '@/components/ui-modified/inputField';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ImageGalleryField from '@/features/galeria/components/imageList/inputFieldGallery';
import { useGroupActions } from '@/features/campanhas/hooks/useActionsGroups';
import { useGroupStore } from '@/features/campanhas/hooks/useStoreGroups';
import MyForm from '@/lib/Formik/Form';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function createInstancesWithGroups(editGroupsIds: any, values: any) {
  const result: {
    instanceId: string;
    groups: Array<{
      id?: string;
      name: string;
      url?: number;
      picture?: string;
    }>;
  }[] = [];

  let globalGroupCounter = values.position;

  editGroupsIds.instances.forEach((instance: any) => {
    const instanceGroups = [];
    const numberOfGroups = instance.groupIds?.length;

    for (let i = 0; i < numberOfGroups; i++) {
      const group = {
        id: instance.groupIds[i],
        ...(values.url && { url: values.url }),
      };

      instanceGroups.push(group);
      globalGroupCounter++;
    }

    result.push({
      instanceId: instance.instanceId,
      groups: instanceGroups,
    });
  });

  return result;
}

export default function EditImagesOnGroupsDialog() {
  const { imageGroups, clearImageGroups } = useGroupStore();
  const [openModal, setOpenModal] = useState(false);
  const params = useParams<{ campaignsId: string }>();
  const { editGroups } = useGroupActions();

  useEffect(() => {
    if (imageGroups && 'groupIds' in imageGroups && imageGroups.groupIds?.length > 0) {
      setOpenModal(true);
    }
  }, [imageGroups, setOpenModal]);

  function handleCloseModal() {
    setOpenModal(!openModal);
    clearImageGroups;
  }

  return (
    <Dialog open={openModal} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar Imagens dos grupos com URL</DialogTitle>
          <DialogDescription>Coloque a url da imagem, para atualizar imagens.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <MyForm
            initialValues={{
              url: '',
            }}
            onSubmit={(values, actions) => {
              const groupsWithPictures = imageGroups?.groupIds.map((groupId) => ({
                id: groupId,
                image: values.url,
              }));
              editGroups(
                {
                  campaignsId: params.campaignsId,
                  groups: groupsWithPictures,
                },
                {
                  onSuccess: async () => {
                    handleCloseModal();
                  },
                  onSettled: () => {
                    actions.setSubmitting(false);
                  },
                },
              );
            }}
          >
            {({ isSubmitting }) => (
              <div className="flex flex-col gap-2">
                <ImageGalleryField name="url" placeholder="URL da imagem" label="URL da imagem" />
                <Button disabled={isSubmitting} className="w-full" type="submit">
                  Atualizar
                </Button>
              </div>
            )}
          </MyForm>
        </div>
      </DialogContent>
    </Dialog>
  );
}
