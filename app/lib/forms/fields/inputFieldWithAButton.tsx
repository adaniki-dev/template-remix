import React, { ComponentPropsWithoutRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiPencil } from "react-icons/hi";
import { useField } from "@/lib/forms/wrapper-form";

interface InputFieldWithButtonProps
  extends Omit<ComponentPropsWithoutRef<typeof Input>, "type"> {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  buttonDisabled?: boolean;
  containerClassName?: string;
  errorClassName?: string;
  helpText?: string;
  buttonLabel?: React.ReactNode;
  onButtonClick?: () => void;
}

const InputFieldWithButton: React.FC<InputFieldWithButtonProps> = ({
  label,
  name,
  placeholder,
  type = "text",
  disabled = false,
  buttonDisabled,
  containerClassName = "",
  errorClassName = "",
  helpText,
  buttonLabel = <HiPencil />,
  onButtonClick,
  className = "",
  ...props
}) => {
  const [field, meta] = useField(name);

  const inputId = `button-input-${name}`;
  const errorId = `${inputId}-error`;
  const helpTextId = helpText ? `${inputId}-helpText` : undefined;

  const hasError = meta.touched && meta.error;
  const errorStyle = hasError ? "" : "opacity-0";
  const inputStyle = hasError ? "border-red-500" : "border-primary";

  const ariaDescribedBy =
    [helpTextId, hasError ? errorId : undefined].filter(Boolean).join(" ") ||
    undefined;

  // Determina se o botão deve estar desabilitado
  const isButtonDisabled =
    buttonDisabled !== undefined ? buttonDisabled : !disabled; // Inverte a lógica original (disabled ? false : true)

  return (
    <div className={`grid gap-1 ${containerClassName}`}>
      {/* Opcional: Mostrar label e erro se o label for fornecido */}
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm" htmlFor={inputId}>
            {label}
          </label>
          <div
            id={errorId}
            className={`error text-xs text-end h-3 text-red-500 ${errorStyle} ${errorClassName}`}
            aria-live="polite"
          >
            {meta.error}
          </div>
        </div>
      )}

      <div className="flex gap-2 items-center">
        <div className="grid gap-1 w-full">
          <Input
            id={inputId}
            className={`${inputStyle} ${className}`}
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={ariaDescribedBy}
            data-error={hasError ? "true" : "false"}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            {...field}
            {...props}
          />

          {/* Mostrar erro caso não tenha label */}
          {!label && hasError && (
            <div
              id={errorId}
              className={`error text-xs text-start h-3 text-red-500 ${errorClassName}`}
              aria-live="polite"
            >
              {meta.error}
            </div>
          )}
        </div>
        <Button
          disabled={isButtonDisabled}
          type="submit"
          onClick={
            onButtonClick &&
            ((e) => {
              e.preventDefault();
              onButtonClick();
            })
          }
        >
          {buttonLabel}
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

export default InputFieldWithButton;
