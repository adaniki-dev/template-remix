import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useField, useForm } from "@/lib/forms/wrapper-form";

interface InputDynamicListProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
  inputClassName?: string;
}

const InputDynamicList: React.FC<InputDynamicListProps> = ({
  label,
  name,
  placeholder = "",
  required = false,
  containerClassName = "",
  labelClassName = "",
  errorClassName = "",
  helpText,
  inputClassName = "",
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useForm();

  // Ensure the field value is an array
  const items: string[] = Array.isArray(field.value) ? field.value : [];

  const inputId = `${name}-list`;
  const errorId = `${inputId}-error`;
  const helpTextId = helpText ? `${inputId}-helpText` : undefined;

  const hasError = meta.touched && meta.error;
  const errorStyle = hasError ? "" : "opacity-0";

  // Add a new empty item to the array
  const addItem = () => {
    setFieldValue(name, [...items, ""]);

    // Mark as touched when adding items
    if (!meta.touched) {
      setFieldTouched(name, true);
    }
  };

  // Remove an item at the specific index
  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setFieldValue(name, newItems);
  };

  // Update an item at the specific index
  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setFieldValue(name, newItems);

    // Mark as touched when updating items
    if (!meta.touched) {
      setFieldTouched(name, true);
    }
  };

  return (
    <div className={`w-full flex flex-col ${containerClassName}`}>
      <div className="flex items-center justify-between mb-2">
        <Label className={`text-sm ${labelClassName}`} htmlFor={inputId}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>

        <div
          id={errorId}
          className={`error text-xs text-end h-3 text-red-500 ${errorStyle} ${errorClassName}`}
          aria-live="polite"
        >
          {meta.error}
        </div>
      </div>

      {items.length > 0 ? (
        items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <Input
              id={`${inputId}-${index}`}
              className={`h-8 flex-grow ${inputClassName}`}
              placeholder={`${placeholder} ${index + 1}`}
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              onBlur={() => setFieldTouched(name, true)}
              aria-labelledby={`${inputId}-label-${index}`}
            />
            <Button
              type="button"
              className="py-2 px-4 bg-red-500 text-white"
              onClick={() => removeItem(index)}
              aria-label={`Remover ${label} ${index + 1}`}
            >
              <FaMinus />
            </Button>
            <Button
              type="button"
              variant="outline"
              className="ml-auto px-4"
              onClick={addItem}
              aria-label={`Adicionar novo ${label}`}
            >
              <FaPlus />
            </Button>
          </div>
        ))
      ) : (
        <Button
          type="button"
          variant="outline"
          className="ml-auto mb-2 px-4"
          onClick={addItem}
        >
          Adicionar {label}
        </Button>
      )}

      {helpText && (
        <div id={helpTextId} className="text-xs text-gray-500 mt-1">
          {helpText}
        </div>
      )}
    </div>
  );
};

export default InputDynamicList;
