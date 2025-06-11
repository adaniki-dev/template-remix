'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { toast } from 'sonner';

import MyForm from '@/lib/Formik/Form';
import { Button } from '@/components/ui/button';
import InputFieldSelect from '@/components/ui-modified/InputFieldSelect';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import InputPhoneNumbers from './inputAdminNumbers';
import { formikValidationSchema } from '@/lib/FormikValidationSchema';
import { formatPhoneNumber } from '@/util/formatPhoneNumber';
import { removeSearchParamsInURL } from '@/util/removeSearchParamsInURL';
import { useContactsContext } from '../../context/contactsContext';
import InputNumberWithValidation from './inputAdminNumbers/inputNumberWithValidation';
import SelectedEmails from './inputAdminEmails';
import InputEmail from './inputAdminEmails/inputEmailWithValidation';
import useUsersActions from '@/features/configProfile/hooks/useUsersActions';

export default function AddContactFormSheet() {
  const searchParams = useSearchParams();
  const { utilizeContact } = useUsersActions();
  const AddAdminNumbers = searchParams.get('AddAdminNumbers');
  const [openModal, setOpenModal] = useState(false);
  const { queriesOptions } = useContactsContext();
  const { data } = queriesOptions;
  const arrayInfo = data?.data;

  useEffect(() => {
    if (AddAdminNumbers === 'y') {
      setOpenModal(true);
    }
  }, [AddAdminNumbers, setOpenModal]);

  const SignupSchema = z.object({
    type: z.string().nonempty({ message: 'Obrigatório' }),
    emails: z.array(z.string()).optional(),
    phones: z.array(z.string()).optional(),
  });

  const handleSubmit = async (values: any, actions: any) => {
    actions.setSubmitting(false);
    if (values.emails.length == 0 && values.phones.length == 0) {
      toast.error(`Você deve inserir pelo menos um contato`);
      return;
    }
    const isArrayType = (e: any) => {
      if (Array.isArray(e)) {
        return e;
      }
      return [];
    };
    let defaultValues = {
      phones: [...isArrayType(arrayInfo?.phones)],
      emails: [...isArrayType(arrayInfo?.emails)],
    };

    const phones: any[] = [];
    values.phones.forEach((phone: any) => {
      const phoneExists = defaultValues?.phones?.includes(`+55${phone}`);
      if (phoneExists) {
        toast.error(`+55${phone} já está em seus contatos`);
        return;
      }
      phones.push(phone);
    });

    const emails: any[] = [];
    values.emails.forEach((email: any) => {
      const emailExists = defaultValues?.emails?.includes(email);
      if (emailExists) {
        toast.error(`${email} já está inserido`);
        return;
      }
      emails.push(email);
    });

    if (emails.length == 0 && phones.length == 0) return;

    if (values.type === 'phones') {
      phones.forEach((phone: any) => {
        defaultValues.phones.push(phone);
      });
    }
    if (values.type === 'emails') {
      values.emails.forEach((email: any) => {
        defaultValues.emails.push(email);
      });
    }
    utilizeContact(defaultValues, {
      onSuccess: () => {
        actions.resetForm();
        toast.success('Contatos adicionados');
        handleCloseModal();
      },
      onError: () => {
        actions.setSubmitting(false);
        toast.error('Erro ao adicionar contato');
      },
    });
  };

  function handleCloseModal() {
    setOpenModal(!openModal);
    removeSearchParamsInURL('AddAdminNumbers');
  }

  return (
    <Sheet open={openModal} onOpenChange={handleCloseModal}>
      <SheetContent className="min-w-[100vw] xl:min-w-[40vw] flex flex-col">
        <SheetHeader>
          <SheetTitle>Insira os contatos administrativos</SheetTitle>
          <SheetDescription>Você deve inserir pelo menos um contato</SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col">
          <MyForm
            initialValues={{
              type: 'phones',
              phones: [],
              invalidMembers: [],
              emails: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={formikValidationSchema(SignupSchema)}
          >
            {({ isSubmitting, values }) => (
              <div className="flex flex-col h-full">
                <div className="h-[76vh] overflow-y-auto flex flex-col gap-4">
                  <InputFieldSelect
                    placeholder="Selecione o tipo"
                    label="Tipo"
                    name="type"
                    options={[
                      { value: 'emails', label: 'E-mail' },
                      { value: 'phones', label: 'Telefone' },
                    ]}
                  />
                  {values.type === 'emails' ? (
                    <div className="flex flex-col gap-2">
                      <InputEmail name="emails" label="E-mail" />
                      <SelectedEmails
                        name="emails"
                        label="E-mail's selecionados"
                        options={values.emails.map((email: string) => ({
                          value: email,
                          label: email,
                        }))}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <InputNumberWithValidation
                        name="phones"
                        label="Telefone"
                        placeholder="Coloque seu telefone"
                      />
                      <InputPhoneNumbers
                        name="phones"
                        label="Números selecionados"
                        orientation="horizontal"
                        options={values.phones.map((phone: string) => ({
                          value: phone,
                          label: formatPhoneNumber(phone),
                        }))}
                      />
                    </div>
                  )}
                </div>
                <Button className="mt-4" disabled={isSubmitting} variant="default" type="submit">
                  Adicionar
                </Button>
              </div>
            )}
          </MyForm>
        </div>
      </SheetContent>
    </Sheet>
  );
}
