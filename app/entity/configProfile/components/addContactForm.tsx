'use client';
import MyForm from '@/lib/Formik/Form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/ui-modified/inputField';
import { z } from 'zod';
import InputFieldPhone from '@/components/ui-modified/inputFieldPhone';
import InputFieldSelect from '@/components/ui-modified/InputFieldSelect';
import { formikValidationSchema } from '@/lib/FormikValidationSchema';
import { toast } from 'sonner';
import { useContactsContext } from '../context/contactsContext';
import { useQueryClient } from '@tanstack/react-query';
import useUsersActions from '@/features/configProfile/hooks/useUsersActions';

export default function AddContactForm() {
  const { queriesOptions } = useContactsContext();
  const { utilizeContact } = useUsersActions();
  const { data } = queriesOptions;
  const arrayInfo = data?.data;
  const queryClient = useQueryClient();

  function addPrefix(phone: any) {
    if (!phone.startsWith('+55')) {
      return '+55' + phone;
    }
    return phone;
  }

  const SignupSchema = z
    .object({
      type: z.string().nonempty({ message: 'Obrigatório' }),
      email: z.string().email({ message: 'E-mail inválido' }).optional(),
      phone: z.string().min(1, { message: 'Telefone é obrigatório' }).optional(),
    })
    .superRefine((data, ctx) => {
      if (data.type === 'email') {
        if (!data.email) {
          ctx.addIssue({
            code: 'custom',
            message: 'E-mail é obrigatório',
            path: ['email'],
          });
        }
      } else if (data.type === 'phone') {
        if (!data.phone) {
          ctx.addIssue({
            code: 'custom',
            message: 'Telefone é obrigatório',
            path: ['phone'],
          });
        } else if (!/^\+?[1-9]\d{1,14}$/.test(data.phone)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Telefone inválido',
            path: ['phone'],
          });
        }
      }
    });

  const handleSubmit = async (values: any, actions: any) => {
    actions.setSubmitting(false);
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
    const phoneExists = defaultValues?.phones?.includes(`+55${values.phone}`);
    const emailExists = defaultValues?.emails?.includes(values.email);
    if (phoneExists || emailExists) {
      toast.error('Contato já adicionado na lista');
      return;
    }
    if (values.type === 'phones') {
      defaultValues.phones.push(values.phone);
    }
    if (values.type === 'emails') {
      defaultValues.emails.push(values.email);
    }
    utilizeContact(defaultValues, {
      onSuccess: () => {
        const phonesFixed = defaultValues.phones.map(addPrefix);
        defaultValues.phones = phonesFixed;
        actions.resetForm();
        queryClient.setQueryData(['/users'], {
          data: { id: data.data.id, name: data.data.name, ...defaultValues },
        });
        toast.success('Contato adicionado com sucesso');
      },
      onError: () => {
        actions.setSubmitting(false);
        toast.error('Erro ao adicionar contato');
      },
    });
  };

  return (
    <MyForm
      initialValues={{
        type: 'phones',
        phone: '',
        email: '',
      }}
      onSubmit={(values, actions) => {
        handleSubmit(values, actions);
      }}
      validationSchema={formikValidationSchema(SignupSchema)}
    >
      {({ isSubmitting, values }) => (
        <div className="grid gap-4">
          <InputFieldSelect
            placeholder="Selecione o tipo"
            label="Tipo"
            name="type"
            options={[
              {
                value: 'emails',
                label: 'E-mail',
              },
              {
                value: 'phones',
                label: 'Telefone',
              },
            ]}
          />
          {values.type === 'emails' ? (
            <InputField placeholder="Coloque seu E-mail" label="E-mail" name="email" type="email" />
          ) : (
            <InputFieldPhone
              placeholder="Coloque seu telefone"
              label="Telefone"
              name="phone"
              type="tel"
            />
          )}
          <Button disabled={isSubmitting} variant="default" type="submit">
            Adicionar
          </Button>
        </div>
      )}
    </MyForm>
  );
}
