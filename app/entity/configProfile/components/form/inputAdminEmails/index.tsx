import React from 'react';
import { useField } from 'formik';
import { EmailItem } from './emailItem';

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface SelectedEmailsProps {
  label: string;
  name: string;
  options: Option[];
  orientation?: 'vertical' | 'horizontal';
  required?: boolean;
  disabled?: boolean;
}

const SelectedEmails: React.FC<SelectedEmailsProps> = ({
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

  return (
    <div className="flex flex-col gap-2">
      {options.length > 0 && (
        <>
          <h6 className="text-sm">{"E-mail's inseridos"}</h6>
          {options.map((option) => (
            <EmailItem
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

      {options.length == 0 && <p>Nenhum e-mail inserido</p>}
    </div>
  );
};

export default SelectedEmails;
