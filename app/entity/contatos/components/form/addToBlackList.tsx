'use client';
import InputFieldPhone from '@/components/ui-modified/inputFieldPhone';
import InputFieldTextArea from '@/components/ui-modified/inputFieldTextArea';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useApiMutation } from '@/core/useAPI';
import MyForm from '@/lib/Formik/Form';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export function AddToBlackListForm() {
  const [openPopover, setOpenPopover] = useState(false);

  const queryClient = useQueryClient();

  const addToBlackList = useApiMutation('/blacklist', 'post', {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/blacklist'],
      });
      setOpenPopover(false);
      toast.success('Adicionado com sucesso');
    },
    onError: () => {
      toast.error('Erro ao adicionar na black list');
    },
  });

  return (
    <Popover open={openPopover} onOpenChange={() => setOpenPopover(!openPopover)}>
      <PopoverTrigger asChild>
        <Button size="sm">Colocar Black List</Button>
      </PopoverTrigger>
      <PopoverContent>
        <MyForm
          initialValues={{ phone: '', reason: '' }}
          onSubmit={async (values, actions) => {
            if (values.phone === '') {
              toast.error('Telefone é obrigatório');
              return;
            }
            actions.setSubmitting(true);
            const numberWith55 = `55${values.phone}`;
            await addToBlackList.mutateAsync(
              { phone: numberWith55, reason: values.reason },
              {
                onSettled: () => {
                  actions.setSubmitting(false);
                },
              },
            );
          }}
        >
          {({ isSubmitting }) => (
            <div className="grid gap-2">
              <InputFieldPhone
                name="phone"
                label="Telefone"
                placeholder="Coloque o número para a black list"
              />
              <InputFieldTextArea label="Razão" name="reason" placeholder="Coloque a razão" />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adicionando...' : 'Adicionar'}
              </Button>
            </div>
          )}
        </MyForm>
      </PopoverContent>
    </Popover>
  );
}
