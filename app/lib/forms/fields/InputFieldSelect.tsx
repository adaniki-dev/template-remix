import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useField, useForm } from "@/lib/forms/wrapper-form";

interface OptionProps {
  value: string;
  label: string | React.ReactNode;
}

interface SelectFieldProps
  extends React.ComponentPropsWithoutRef<typeof Select> {
  label: string;
  name: string;
  placeholder: string;
  options: OptionProps[];
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
  className?: string;
}

const InputFieldSelect: React.FC<SelectFieldProps> = ({
  label,
  name,
  placeholder,
  options,
  required = false,
  containerClassName = "",
  labelClassName = "",
  errorClassName = "",
  helpText,
  className = "",
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useForm();

  const inputId = `select-${name}`;
  const errorId = `${inputId}-error`;
  const helpTextId = helpText ? `${inputId}-helpText` : undefined;

  const hasError = meta.touched && meta.error;
  const errorStyle = hasError ? "" : "opacity-0";
  const inputStyle = hasError ? "border-red-500" : "border-primary";

  const ariaDescribedBy =
    [helpTextId, hasError ? errorId : undefined].filter(Boolean).join(" ") ||
    undefined;

  const handleChange = (value: string) => {
    setFieldValue(name, value);
    setFieldTouched(name, true);
  };

  return (
    <div className={`w-full gap-1 grid h-min ${containerClassName}`}>
      <div className="flex items-center justify-between">
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

      <Select
        onValueChange={handleChange}
        value={field.value || ""}
        name={name}
        defaultValue={field.value}
      >
        <SelectTrigger
          id={inputId}
          className={`${inputStyle} h-8 ${className}`}
          aria-required={required ? "true" : "false"}
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={ariaDescribedBy}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.length === 0 && (
            <p className="p-2">Nenhum item disponível</p>
          )}

          {options.map((option) => (
            <SelectItem
              className="capitalize"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {helpText && (
        <div id={helpTextId} className="text-xs text-gray-500 mt-1">
          {helpText}
        </div>
      )}
    </div>
  );
};

export default InputFieldSelect;
