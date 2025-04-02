import React, { ComponentPropsWithoutRef } from "react";
import TextAreaWithEmoji from "@/lib/emoji-picker/input-text-area-with-emoji";
import { Label } from "@/components/ui/label";
import { useField, useForm } from "@/lib/forms/wrapper-form";

// Omitindo as propriedades que serão tratadas de forma personalizada
type TextAreaWithEmojiProps = Omit<
  ComponentPropsWithoutRef<typeof TextAreaWithEmoji>,
  "value" | "onChange" | "onBlur" | "name"
>;

interface TextAreaWithEmojiFieldProps extends TextAreaWithEmojiProps {
  label: string;
  name: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
  locale?: string;
  theme?: "light" | "dark";
  maxLength?: number;
}

const InputTextAreaWithEmojiField: React.FC<TextAreaWithEmojiFieldProps> = ({
  id,
  label,
  name,
  required = false,
  containerClassName = "",
  labelClassName = "",
  errorClassName = "",
  helpText,
  className = "",
  locale = "pt",
  theme = "light",
  maxLength = 500,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useForm();

  const inputId = id || name;
  const errorId = `${inputId}-error`;
  const helpTextId = helpText ? `${inputId}-helpText` : undefined;

  const hasError = meta.touched && meta.error;
  const errorStyle = hasError ? "" : "opacity-0";
  const inputStyle = hasError ? "border-red-500" : "border-primary";

  const ariaDescribedBy =
    [helpTextId, hasError ? errorId : undefined].filter(Boolean).join(" ") ||
    undefined;

  // Manipulador personalizado para o TextAreaWithEmoji
  const handleChange = (value: string) => {
    setFieldValue(name, value);
  };

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

      <TextAreaWithEmoji
        id={inputId}
        value={field.value || ""}
        onChange={handleChange}
        onBlur={field.onBlur}
        name={name}
        locale={locale}
        theme={theme}
        maxLength={maxLength}
        className={`${inputStyle} ${className}`}
        aria-invalid={hasError ? "true" : "false"}
        aria-required={required ? "true" : "false"}
        aria-describedby={ariaDescribedBy}
        data-error={hasError ? "true" : "false"}
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

export default InputTextAreaWithEmojiField;
