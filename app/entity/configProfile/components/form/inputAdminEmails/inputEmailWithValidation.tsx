import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Field, FieldProps, useField, useFormikContext } from 'formik';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

interface EmailBadgeInputProps {
  name: string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
}

export default function InputEmail(props: EmailBadgeInputProps) {
  const [emailInput, setEmailInput] = useState<string>('');
  const [field, meta] = useField(props.name);
  const { setFieldValue } = useFormikContext();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmailInput(e.target.value);
  }

  function handleAddEmail() {
    if (emailInput === '' || !emailRegex.test(emailInput)) return;

    setFieldValue('emails', [...field.value, emailInput]);
    setEmailInput('');
  }

  const inputStyle = meta.touched && meta.error ? 'border-red-500' : 'border-primary';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEmail();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Label className="text-sm" htmlFor={props.name}>
          {props.label ?? 'Adicione os e-mails administrativos'}
        </Label>
      </div>

      <Field name={props.name}>
        {({ form }: FieldProps) => (
          <div>
            <div className="flex items-center gap-2">
              <Input
                id="email"
                className={inputStyle}
                value={emailInput}
                onChange={handleEmailChange}
                onKeyDown={handleKeyDown}
                placeholder={props.placeholder ?? 'Adicione os e-mails administrativos'}
              />
              <Button onClick={handleAddEmail} type="button">
                <PlusIcon />
              </Button>
            </div>
          </div>
        )}
      </Field>

      {meta.touched && meta.error && (
        <div className={`error text-sm text-red-500`}>{meta.error}</div>
      )}
    </div>
  );
}
