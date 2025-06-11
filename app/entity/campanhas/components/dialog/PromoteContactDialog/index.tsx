'use client';

import PhoneBadgeInput from '@/components/ui-modified/phoneBadgeInput';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGroupActions } from '@/features/campanhas/hooks/useActionsGroups';
import { IPromoteContactToAdmin } from '@/features/campanhas/hooks/useActionsGroups/types';
import MyForm from '@/lib/Formik/Form';
import { adaptFormatPhoneToAPI } from '@/util/adaptFormatPhoneToAPI';
import { removeSearchParamsInURL } from '@/util/removeSearchParamsInURL';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormikHelpers } from 'formik';
import { AiOutlineLoading } from 'react-icons/ai';
import { toast } from 'sonner';
import FormsLoadings from '@/components/ui/loadings/formsLoadings';

interface PromoteContactsFormValues {
  contacts: string[];
}

export default function PromoteContactsDialog() {
  const [openModal, setOpenModal] = useState(false);
  const searchParams = useSearchParams();
  const params = useParams();
  const { promoteContactsToAdmin } = useGroupActions();
  const groupId = searchParams.get('ContactPromote') as string;

  useEffect(() => {
    if (groupId) {
      setOpenModal(true);
    }
  }, [groupId]);

  const handleCloseModal = () => {
    setOpenModal(false);
    removeSearchParamsInURL('ContactPromote');
  };

  const handlePromoteContactsToAdmin = async (
    body: IPromoteContactToAdmin,
    actions: FormikHelpers<PromoteContactsFormValues>,
  ) => {
    await promoteContactsToAdmin(body, {
      onSuccess: () => {
        actions.resetForm();
        actions.setSubmitting(false);
        handleCloseModal();
      },
    });
  };

  const initialValues: PromoteContactsFormValues = {
    contacts: [],
  };

  return (
    <Dialog open={openModal} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Promover contatos</DialogTitle>
          <DialogDescription>Promova contatos para admin um grupo</DialogDescription>
        </DialogHeader>
        <MyForm
          initialValues={initialValues}
          onSubmit={(
            values: PromoteContactsFormValues,
            actions: FormikHelpers<PromoteContactsFormValues>,
          ) => {
            if (!values.contacts.length) {
              toast.error('Adicione pelo menos um contato');
              actions.setSubmitting(false);
              return;
            }
            const body: IPromoteContactToAdmin = {
              campaignsId: params.campaignsId as string,
              groupId: groupId,
              contacts: values.contacts.map((contact: string) => ({
                phone: `55${adaptFormatPhoneToAPI(contact)}`,
              })),
            };
            handlePromoteContactsToAdmin(body, actions);
          }}
        >
          {({ isSubmitting }) => (
            <div className="grid gap-3">
              <PhoneBadgeInput
                name="contacts"
                label="Contatos"
                placeholder="Digite o número do telefone"
              />
              <Button disabled={isSubmitting} className="w-full" type="submit">
                {isSubmitting && <AiOutlineLoading className="animate-spin mr-2" />}
                {isSubmitting ? 'Promovendo...' : 'Promover'}
              </Button>
              <FormsLoadings
                isSubmitting={isSubmitting}
                message="Estamos promovendo seus números"
              />
            </div>
          )}
        </MyForm>
      </DialogContent>
    </Dialog>
  );
}
