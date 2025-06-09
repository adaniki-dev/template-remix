'use client';
import { Label } from '@/components/ui/label';
import { useFormikContext } from 'formik';
import { Trash2 } from 'lucide-react';

export function EmailItem({ orientation, name, option, field, handleChange }: any) {
  const { values, setFieldValue } = useFormikContext<any>();

  function handleDeleteMemberListNumber() {
    const newEmails = values.emails.filter((number: any) => {
      return number !== option.value;
    });
    setFieldValue('emails', newEmails);
  }

  return (
    <div
      key={option.value}
      className={`flex w-full items-center space-x-2 border border-green-500 text-green-500 rounded-md px-4 py-2 ${orientation === 'vertical' ? 'mb-2' : 'mr-4 mb-2'}`}
    >
      <div className="flex items-center justify-between gap-1.5 w-full leading-none">
        <div className="flex items-center gap-4">
          <Label
            htmlFor={`${name}-${option.value}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option.label}
          </Label>
          {option.description && (
            <p className="text-sm text-muted-foreground">{option.description}</p>
          )}
        </div>

        <div>
          <Trash2 onClick={handleDeleteMemberListNumber} className="text-red-500" />
        </div>
      </div>
    </div>
  );
}
