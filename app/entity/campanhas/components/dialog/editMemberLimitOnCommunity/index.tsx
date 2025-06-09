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
import FormsLoadings from '@/components/ui/loadings/formsLoadings';
import { useGroupActions } from '@/features/campanhas/hooks/useActionsGroups';
import { useGroupStore } from '@/features/campanhas/hooks/useStoreGroups';
import MyForm from '@/lib/Formik/Form';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

export default function EditMemberLimitOnCommunityDialog() {
  const { memberLimitGroups, clearMemberLimitGroups } = useGroupStore();
  const { editCommunity } = useGroupActions();
  const [openModal, setOpenModal] = useState(false);
  const params = useParams<{ campaignsId: string }>();
  const { campaignsId } = params;

  useEffect(() => {
    if (
      memberLimitGroups &&
      'groupIds' in memberLimitGroups &&
      memberLimitGroups.groupIds?.length > 0
    ) {
      setOpenModal(true);
    }
  }, [memberLimitGroups, setOpenModal]);

  function handleCloseModal() {
    setOpenModal(!openModal);
    clearMemberLimitGroups();
  }

  return (
    <Dialog open={openModal} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualize limite de membros de comunidade</DialogTitle>
          <DialogDescription>
            Recomendamos o limite ter capacidade de 3000 membros
          </DialogDescription>
        </DialogHeader>
        <MyForm
          initialValues={{
            memberLimit: '',
          }}
          onSubmit={async (values, actions) => {
            if (!values.memberLimit) {
              actions.setFieldError('memberLimit', 'Campo obrigatório');
              return;
            }
            const groupsWithUserLimit = memberLimitGroups?.groupIds.reduce((acc, groupId) => {
              return {
                ...acc,
                memberLimit: Number(values.memberLimit),
              };
            }, {});

            const body = {
              campaignsId,
              community: groupsWithUserLimit,
              ids: memberLimitGroups?.groupIds,
            };
            await editCommunity(body, {
              onSuccess: async () => {
                handleCloseModal();
              },
              onSettled: () => {
                actions.setSubmitting(false);
              },
            });
          }}
        >
          {({ isSubmitting }) => (
            <div className="grid gap-3">
              <InputField
                name="memberLimit"
                placeholder="Limite de membros"
                label="Limite de membros (max: 3000)"
                max={3000}
                min={1}
                type="number"
              />
              <Button disabled={isSubmitting} className="w-full" type="submit">
                {isSubmitting && <AiOutlineLoading className="animate-spin" />}
                {isSubmitting ? 'Atualizando...' : 'Atualizar'}
              </Button>
              <FormsLoadings isSubmitting={isSubmitting} message="Atualizando limite de membros" />
            </div>
          )}
        </MyForm>
      </DialogContent>
    </Dialog>
  );
}
