import React from 'react';
import { useField } from 'formik';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PhoneItem } from './phoneItem';

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface InputPhoneNumbersProps {
  label: string;
  name: string;
  options: Option[];
  orientation?: 'vertical' | 'horizontal';
  required?: boolean;
  disabled?: boolean;
}

const InputPhoneNumbers: React.FC<InputPhoneNumbersProps> = ({
  name,
  options,
  orientation = 'vertical',
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

  // const errorStyle = meta.touched && meta.error ? '' : 'opacity-0';
  // const orientationClass = orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col';
  return (
    <div className="flex flex-col gap-2">
      {options.length > 0 && (
        <>
          <h6 className="text-sm">Números inseridos</h6>
          {options.map((option) => (
            <PhoneItem
              key={option.value}
              orientation={orientation}
              option={option}
              name={name}
              field={field}
              handleChange={handleChange}
            />
          ))}
        </>
      )}

      {options.length == 0 && <p>Nenhum número inserido</p>}
    </div>
  );
};

export default InputPhoneNumbers;
