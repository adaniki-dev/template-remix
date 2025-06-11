'use client';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useHooksActions } from '@/features/integrations/hooks/useHooksActions';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'sonner';
import { number } from 'zod';

type ShowNumberAndGroupsProps = {
  type: 'number' | 'group';
  numbers: string[];
  hookId: string;
};

export default function ShowNumberAndGroups({ type, numbers, hookId }: ShowNumberAndGroupsProps) {
  const { deleteHooksGroupsResponsible, deletePhoneNumbersResponsible } = useHooksActions();
  const [isOpen, setIsOpen] = useState(false);
  function phoneMask(value: string) {
    const phoneNumber = value.replace('+55', '');
    return phoneNumber
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})$/, '$1');
  }
  function numberOrGroup() {
    if (number.length === 0) return [];
    if (type === 'number') {
      return numbers.map((number) => phoneMask(number));
    }
    return numbers;
  }
  if (!numbers || numbers.length === 0) return null;

  function deleteNumberOrGroup(numberOrGroup: any) {
    if (type === 'number') {
      deletePhoneNumbersResponsible(
        { numbers: numberOrGroup, hookId: hookId },
        {
          onSuccess: () => {
            toast.success('Número removido com sucesso');
          },
          onError: () => {
            toast.error('Erro ao remover número');
          },
        },
      );
    } else {
      deleteHooksGroupsResponsible(
        { numbers: numberOrGroup.id, hookId: hookId },
        {
          onSuccess: () => {
            toast.success('Grupo removido com sucesso');
          },
          onError: () => {
            toast.error('Erro ao remover grupo');
          },
        },
      );
    }
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4 border border-primary rounded-md">
        <h4 className="text-sm font-semibold">
          {numberOrGroup().length} {type === 'number' ? 'Números' : 'Grupos'} cadastrados
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        {numberOrGroup().map((item: any, index) => (
          <div
            key={index}
            className="rounded-md flex justify-between border px-4 py-3 font-mono text-sm"
          >
            {type === 'group' ? (item?.name as string) : item}
            <FaTrash
              onClick={() => deleteNumberOrGroup(item)}
              className="ml-2 cursor-pointer text-red-500"
            />
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
