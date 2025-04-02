"use client";
import React from "react";
import { useField, useForm } from "@/lib/forms/wrapper-form";
import { Label } from "@/components/ui/label";
import InputRichTextNoTool from "@/lib/rich-text/richTextNoTool";

interface RichTextProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
  required?: boolean;
}

const InputRichTextField: React.FC<RichTextProps> = function RichTextComponent({
  label,
  name,
  id,
  containerClassName = "",
  labelClassName = "",
  errorClassName = "",
  helpText,
  required = false,
  ...props
}) {
  const { values: initialValues } = useForm();
  const [field, meta] = useField(name);
  const { setFieldValue } = useForm();

  const inputId = id || name;
  const errorId = `${inputId}-error`;
  const helpTextId = helpText ? `${inputId}-helpText` : undefined;

  const hasError = meta.touched && meta.error;
  const errorStyle = hasError ? "" : "opacity-0";

  const formvalues = {
    content: field.value,
    onUpdate: ({ editor }: any) => {
      setFieldValue(name, editor.getHTML());
    },
  };

  const ariaDescribedBy =
    [helpTextId, hasError ? errorId : undefined].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={`grid gap-1 ${containerClassName}`}>
      <div className="flex items-center justify-between">
        <Label htmlFor={inputId} className={`text-sm ${labelClassName}`}>
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

      <InputRichTextNoTool
        id={inputId}
        formValues={formvalues}
        initialValues={initialValues}
        name={name}
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

export default InputRichTextField;
