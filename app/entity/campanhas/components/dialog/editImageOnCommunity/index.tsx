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

export default function EditImagesOnCommunityDialog() {
  const { imageGroups, clearImageGroups } = useGroupStore();
  const [openModal, setOpenModal] = useState(false);
  const params = useParams<{ campaignsId: string }>();
  const { editCommunity } = useGroupActions();

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
          <DialogTitle>Atualizar Imagens de comunidade com URL</DialogTitle>
          <DialogDescription>Coloque a url da imagem, para atualizar imagens.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <MyForm
            initialValues={{
              url: '',
            }}
            onSubmit={(values, actions) => {
              const groupsWithPictures = imageGroups?.groupIds.reduce((acc, groupId) => {
                return {
                  ...acc,
                  image: values.url,
                };
              }, {});

              editCommunity(
                {
                  campaignsId: params.campaignsId,
                  community: groupsWithPictures,
                  ids: imageGroups?.groupIds,
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
