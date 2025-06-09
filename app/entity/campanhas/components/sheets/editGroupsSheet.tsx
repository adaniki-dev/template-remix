'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { useEffect, useState } from 'react';
import FormEditGroup from '@/features/campanhas/components/form/formEditGroup';
import { useGroupStore } from '@/features/campanhas/hooks/useStoreGroups';

export default function EditGroupsSheet() {
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
          <SheetTitle>Edite seus grupos</SheetTitle>
          <SheetDescription>
            Altere as informações do seu grupo, recomendamos o limite de membros em 600
          </SheetDescription>
        </SheetHeader>
        {editGroupsIds && <FormEditGroup handleCloseModal={handleCloseModal} />}
      </SheetContent>
    </Sheet>
  );
}
