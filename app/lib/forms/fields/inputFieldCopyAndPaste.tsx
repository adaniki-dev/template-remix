import React, { useRef, ComponentPropsWithoutRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "sonner";
import { useField } from "@/lib/forms/wrapper-form";

interface CopyPasteFieldProps
  extends Omit<ComponentPropsWithoutRef<typeof Input>, "name"> {
  label?: string;
  name: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
  initialValue?: string;
}

const InputCopyPasteField: React.FC<CopyPasteFieldProps> = ({
  id,
  label,
  name,
  required = false,
  containerClassName = "",
  labelClassName = "",
  errorClassName = "",
  helpText,
  className = "",
  initialValue = "",
  ...props
}) => {
  const [field, meta] = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayValue = field.value || initialValue;

  const inputId = id || name;
  const errorId = `${inputId}-error`;
  const helpTextId = helpText ? `${inputId}-helpText` : undefined;

  const hasError = meta.touched && meta.error;
  const errorStyle = hasError ? "" : "opacity-0";
  const inputStyle = hasError ? "border-red-500" : "border-primary";

  const ariaDescribedBy =
    [helpTextId, hasError ? errorId : undefined].filter(Boolean).join(" ") ||
    undefined;

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (displayValue) {
      await navigator.clipboard.writeText(displayValue);
      toast.info("Copiado para a área de transferência");
    }
  };

  return (
    <div className={`grid gap-1 ${containerClassName}`}>
      {label && (
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
      )}

      <div className="flex">
        <Input
          id={inputId}
          className={`mr-1 h-8 ${inputStyle} ${className}`}
          aria-invalid={hasError ? "true" : "false"}
          aria-required={required ? "true" : "false"}
          aria-describedby={ariaDescribedBy}
          data-error={hasError ? "true" : "false"}
          ref={inputRef}
          disabled
          readOnly
          {...field}
          value={displayValue}
          {...props}
        />
        <Button size="sm" type="button" onClick={copyToClipboard}>
          <FaRegCopy />
        </Button>
      </div>

      {helpText && (
        <div id={helpTextId} className="text-xs text-gray-500 mt-1">
          {helpText}
        </div>
      )}
    </div>
  );
};

export default InputCopyPasteField;
