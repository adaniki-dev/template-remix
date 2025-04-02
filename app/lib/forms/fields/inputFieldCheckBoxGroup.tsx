import React from 'react';
import { useField } from 'formik';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface InputFieldCheckBoxGroupProps {
  label: string;
  name: string;
  options: Option[];
  orientation?: 'vertical' | 'horizontal';
  required?: boolean;
  disabled?: boolean;
}

const InputFieldCheckBoxGroup: React.FC<InputFieldCheckBoxGroupProps> = ({
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
          <div
            key={option.value}
            className={`flex items-start space-x-2 ${orientation === 'vertical' ? 'mb-2' : 'mr-4 mb-2'}`}
          >
            <Checkbox
              id={`${name}-${option.value}`}
              checked={(field.value || []).includes(option.value)}
              onCheckedChange={(checked) => {
                handleChange(option.value, checked as boolean);
              }}
            />
            <div className="grid gap-1.5 leading-none">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputFieldCheckBoxGroup;
