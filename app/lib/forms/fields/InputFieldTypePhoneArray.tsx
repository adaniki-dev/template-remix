import React from 'react';
import { FieldArray } from 'formik';
import { Button } from '../ui/button';
import { FaMinus, FaPlus } from 'react-icons/fa';
import InputFieldPhone from './inputFieldPhone';

const InputFieldTypePhoneArray = ({ values, ...props }: any) => {
  const array = values[props.name] || [];
  return (
    <FieldArray
      name={props.name}
      render={(arrayHelpers) => {
        return (
          <div className="w-full flex flex-col">
            {array.length > 0 ? (
              array.map((item: number, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <InputFieldPhone
                    label={`${props.label} ${index + 1}`}
                    name={`${props.name}.${index}`}
                    placeholder={`${props.placeholder} ${index + 1}`}
                  />
                  <Button
                    type="button"
                    className="py-2 px-4 bg-red-500 text-white"
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    <FaMinus />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="ml-auto px-4 "
                    onClick={() => arrayHelpers.push('')}
                  >
                    <FaPlus />
                  </Button>
                </div>
              ))
            ) : (
              <Button
                type="button"
                variant="outline"
                className="ml-auto mb-2 px-4 "
                onClick={() => arrayHelpers.push('')}
              >
                Adicionar {props.label}
              </Button>
            )}
          </div>
        );
      }}
    />
  );
};

export default InputFieldTypePhoneArray;
