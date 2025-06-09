import React from 'react';
import { useField } from 'formik';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CheckboxParticipants } from '@/features/campanhas/components/form/InputCheckBoxAdminsParticipants/checkboxNumber';

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface InputFieldAdminParticipantsProps {
  label: string;
  name: string;
  options: Option[];
  orientation?: 'vertical' | 'horizontal';
  required?: boolean;
  disabled?: boolean;
}

const InputFieldAdminParticipants: React.FC<InputFieldAdminParticipantsProps> = ({
  label,
  name,
  options,
  orientation = 'vertical',
  required = false,
  disabled = false,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (value: string, checked: boolean) => {
    const currentValues = field.value || [];
    let newValues;
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((v: string) => v !== value);
    }
    helpers.setValue(newValues);
  };

  const errorStyle = meta.touched && meta.error ? '' : 'opacity-0';
  const orientationClass = orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col';
  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <div className={`text-xs h-3 text-red-500 ${errorStyle}`}>{meta.error}</div>
      </div>

      <div className={`flex ${orientationClass}`}>
        {options.map((option) => (
          <CheckboxParticipants
            key={option.value}
            orientation={orientation}
            option={option}
            name={name}
            field={field}
            handleChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
};

export default InputFieldAdminParticipants;
