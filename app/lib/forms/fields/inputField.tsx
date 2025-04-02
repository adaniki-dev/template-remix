import React, { ComponentPropsWithoutRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useField } from "@/lib/forms/wrapper-form";

interface InputFieldProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  name = "",
  required = false,
  containerClassName = "",
  labelClassName = "",
  errorClassName = "",
  helpText,
  className = "",
  ...props
}) => {
  const [field, meta] = useField(name);

  const inputId = id || name;
  const errorId = `${inputId}-error`;
  const helpTextId = helpText ? `${inputId}-helpText` : undefined;

  const hasError = meta.touched && meta.error;
  const errorStyle = hasError ? "" : "opacity-0";
  const inputStyle = hasError ? "border-red-500" : "border-primary";

  const ariaDescribedBy =
    [helpTextId, hasError ? errorId : undefined].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={`grid gap-1 ${containerClassName}`}>
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
        {...field}
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

export default InputField;
