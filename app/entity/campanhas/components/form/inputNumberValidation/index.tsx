import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Field, FieldProps, useField, useFormikContext } from 'formik';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PhoneBadgeInputProps {
  name: string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
}

export default function InputNumberValidation(props: PhoneBadgeInputProps) {
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [field, meta] = useField(props.name);
  const { setFieldValue } = useFormikContext();

  const phoneRegex = /^(\+\d{1,3}\s?)?(\(\d{1,3}\)\s?)?[\d\s-]{8,}$/;

  function formatPhoneNumber(phone: string): string {
    const digits = phone.replace(/\D/g, '');

    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhoneInput(formattedPhone);
  }

  function handleAddPhone() {
    if (phoneInput === '' || !phoneRegex.test(phoneInput)) return;
    const numericPhone = phoneInput.replace(/\D/g, '');
    setFieldValue(props.name, [...field.value, numericPhone]);
    setPhoneInput('');
  }

  const inputStyle = meta.touched && meta.error ? 'border-red-500' : 'border-primary';

  useEffect(() => {
    if (field.value?.length > 0) {
      setFieldValue(props.name, field.value);
    }
  }, [field.value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddPhone();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Label className="text-sm" htmlFor={props.name}>
          {props.label ?? 'Adicione números de telefone'}
        </Label>
        <div className={`error text-sm text-end h-3 text-red-500`}>{meta.error}</div>
      </div>

      <Field name={props.name}>
        {({ form }: FieldProps) => (
          <div>
            <div className="flex items-center gap-2">
              <Input
                id="phone"
                className={inputStyle}
                value={phoneInput}
                onChange={handlePhoneChange}
                onKeyDown={handleKeyDown}
                placeholder="Adicione números participantes"
              />
              <Button onClick={handleAddPhone} type="button">
                <PlusIcon />
              </Button>
            </div>
          </div>
        )}
      </Field>
    </div>
  );
}
