import React, { useEffect, useState, ComponentPropsWithoutRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useField, useForm } from "@/lib/forms/wrapper-form";

interface PhoneFieldProps
  extends Omit<ComponentPropsWithoutRef<typeof Input>, "name"> {
  label: string;
  name: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
}

const InputPhoneField: React.FC<PhoneFieldProps> = ({
  id,
  label,
  name,
  required = false,
  containerClassName = "",
  labelClassName = "",
  errorClassName = "",
  helpText,
  className = "",
  placeholder = "",
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useForm();
  const [displayValue, setDisplayValue] = useState("");

  const inputId = id || name;
  const errorId = `${inputId}-error`;
  const helpTextId = helpText ? `${inputId}-helpText` : undefined;

  const hasError = meta.touched && meta.error;
  const errorStyle = hasError ? "" : "opacity-0";
  const inputStyle = hasError ? "border-red-500" : "border-primary";

  const ariaDescribedBy =
    [helpTextId, hasError ? errorId : undefined].filter(Boolean).join(" ") ||
    undefined;

  // Função de máscara para telefones
  const phoneMask = (value: string) => {
    if (!value) return "";

    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  // Atualiza o valor de exibição quando o valor do campo mudar
  useEffect(() => {
    if (field.value) {
      setDisplayValue(phoneMask(field.value));
    }
  }, [field.value]);

  // Atualiza o valor no formulário quando o valor de exibição mudar
  useEffect(() => {
    if (displayValue) {
      const cleanValue = displayValue.replace(/\D/g, "");
      setFieldValue(name, cleanValue);
    }
  }, [displayValue, name, setFieldValue]);

  // Manipulador de mudança que aplica a máscara
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = phoneMask(e.target.value);
    setDisplayValue(maskedValue);
  };

  return (
    <div className={`grid gap-1 w-full ${containerClassName}`}>
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

      <Input
        id={inputId}
        className={`h-8 ${inputStyle} ${className}`}
        aria-invalid={hasError ? "true" : "false"}
        aria-required={required ? "true" : "false"}
        aria-describedby={ariaDescribedBy}
        data-error={hasError ? "true" : "false"}
        placeholder={placeholder}
        maxLength={15}
        value={displayValue}
        onChange={handleChange}
        onBlur={field.onBlur}
        name={name}
        {...props}
      />

      {helpText && (
        <div id={helpTextId} className="text-xs text-gray-500 mt-1">
          {helpText}
        </div>
      )}
    </div>
  );
};

export default InputPhoneField;
