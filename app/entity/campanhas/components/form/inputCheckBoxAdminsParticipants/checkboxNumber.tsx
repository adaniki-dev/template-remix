import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useApiQuery } from '@/core/useAPI';
import { useFormikContext } from 'formik';
import { BadgeAlert, BadgeCheck, Ban, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { toast } from 'sonner';

export function CheckboxParticipants({ orientation, name, option, field, handleChange }: any) {
  const { values, setFieldValue } = useFormikContext<any>();
  function verifyAndFormatPhone(phone: string): string {
    const regex = /^(\d{2})(9)(\d{8})$/;
    const match = phone.match(regex);
    if (match) {
      return `${match[1]}${match[3]}`;
    }
    return phone;
  }

  const { isError, isLoading, isSuccess } = useApiQuery(
    ['validatePhone', option.value],
    `/groups/validate/phone?phone=${'55' + verifyAndFormatPhone(option.value)}`,
    {
      enabled: !!option.value,
      retry: false,
    },
  );

  useEffect(() => {
    if (isError) {
      toast.error(`Número não encontrado no WhatsApp: ${option.label}`, {
        duration: 10000,
        icon: <Ban />,
      });
      const hasInvalidMember = values.invalidMembers.includes(option.value);
      if (hasInvalidMember) return;
      setFieldValue('invalidMembers', [...values.invalidMembers, option.value]);
    }
  }, [isError]);

  function handleDeleteMemberListNumber() {
    const newInvalidMembers = values.invalidMembers.filter(
      (member: any) => member !== option.value,
    );
    const newMembersList = values.membersList.filter((member: any) => member !== option.value);
    setFieldValue('membersList', newMembersList);
    setFieldValue('invalidMembers', newInvalidMembers);
  }

  return (
    <div
      key={option.value}
      className={`flex w-full items-center space-x-2 ${orientation === 'vertical' ? 'mb-2' : 'mr-4 mb-2'} ${isLoading && 'border border-primary'} ${isError && 'border border-destructive text-destructive'} ${isSuccess && 'border border-green-500 text-green-500'}  rounded-md px-4 py-2`}
    >
      <Checkbox
        disabled={isLoading || isError}
        id={`${name}-${option.value}`}
        checked={(field.value || []).includes(option.value)}
        onCheckedChange={(checked) => {
          handleChange(option.value, checked as boolean);
        }}
      />
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
          {isLoading && <AiOutlineLoading className="animate-spin" />}
          {isError && <BadgeAlert className="text-red-500" />}
          {isSuccess && <BadgeCheck className="text-green-500" />}
        </div>

        <div>
          <Trash2 onClick={handleDeleteMemberListNumber} className="text-red-500" />
        </div>
      </div>
    </div>
  );
}
