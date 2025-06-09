'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { useEffect, useState } from 'react';
import { useGroupStore } from '@/features/campanhas/hooks/useStoreGroups';
import FormEditCommunity from '@/features/campanhas/components/form/formEditCommunity';

export default function EditCommunitySheet() {
  const [openModal, setOpenModal] = useState(false);
  const { editGroupsIds, clearEditGroupsIds } = useGroupStore();
  useEffect(() => {
    if (editGroupsIds && 'groupIds' in editGroupsIds && editGroupsIds.groupIds.length > 0) {
      setOpenModal(true);
    }
  }, [editGroupsIds, setOpenModal]);

  function handleCloseModal() {
    clearEditGroupsIds();
    setOpenModal(!openModal);
  }

  return (
    <Sheet open={openModal} onOpenChange={handleCloseModal}>
      <SheetContent className="min-w-[100vw] xl:min-w-[40vw] gap-4 flex flex-col">
        <SheetHeader>
          <SheetTitle>Edite suas comunidades</SheetTitle>
          <SheetDescription>
            Altere as informações da sua comunidade, recomendamos o limite de membros em 600
          </SheetDescription>
        </SheetHeader>
        {editGroupsIds && <FormEditCommunity handleCloseModal={handleCloseModal} />}
      </SheetContent>
    </Sheet>
  );
}
