'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import MyForm from '@/lib/Formik/Form';

import InputFieldPhone from '@/components/ui-modified/inputFieldPhone';

interface AdminTelephoneProps {
  openModal: boolean;
  onCloseModal: () => void;
  onConfirm: (telefone: string) => void;
}

export default function AdminTelephone({
  openModal,
  onCloseModal,
  onConfirm,
}: AdminTelephoneProps) {
  return (
    <Dialog open={openModal} onOpenChange={onCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Número de Telefone</DialogTitle>
          <DialogDescription>Selecione ou adicione um número de telefone: </DialogDescription>
        </DialogHeader>
        <MyForm
          initialValues={{ telefone: '' }}
          onSubmit={(values, actions) => {
            if (values.telefone.trim()) {
              onConfirm(values.telefone);
              actions.resetForm();
              onCloseModal();
            } else {
              alert('Por favor, insira um número válido.');
            }
            actions.setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <div className="grid gap-3">
              <InputFieldPhone
                label="Número de Telefone"
                name="telefone"
                title="Selecione ou adicione um número"
                placeholder="Insira ou selecione um número"
                required
              />
              <div className="flex gap-2 justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-48 hover:bg-blue-400 hover:transition-all duration-300"
                >
                  Confirmar
                </Button>
              </div>
            </div>
          )}
        </MyForm>
      </DialogContent>
    </Dialog>
  );
}
