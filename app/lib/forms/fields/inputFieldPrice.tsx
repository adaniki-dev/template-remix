import React, { useEffect, useState, ComponentPropsWithoutRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useField, useForm } from "@/lib/forms/wrapper-form";

interface PriceFieldProps
  extends Omit<ComponentPropsWithoutRef<typeof Input>, "name"> {
  label: string;
  name: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
}

const InputPriceField: React.FC<PriceFieldProps> = ({
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

  // Inicializa o state com o valor do campo convertido para número
  const [numericValue, setNumericValue] = useState<number | undefined>(() => {
    if (!field.value) return undefined;
    return typeof field.value === "string"
      ? parseFloat(field.value)
      : field.value;
  });

  const inputId = id || name;
  const errorId = `${inputId}-error`;
  const helpTextId = helpText ? `${inputId}-helpText` : undefined;

  const hasError = meta.touched && meta.error;
  const errorStyle = hasError ? "" : "opacity-0";
  const inputStyle = hasError ? "border-red-500" : "border-primary";

  const ariaDescribedBy =
    [helpTextId, hasError ? errorId : undefined].filter(Boolean).join(" ") ||
    undefined;

  // Função para formatar o valor como moeda brasileira
  const formatPrice = (value: number | undefined): string => {
    if (value === undefined || isNaN(value)) {
      return "";
    }
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Atualiza o state quando o valor do campo mudar
  useEffect(() => {
    if (field.value) {
      const parsedValue =
        typeof field.value === "string" ? parseFloat(field.value) : field.value;

      if (!isNaN(parsedValue)) {
        setNumericValue(parsedValue);
      }
    } else {
      setNumericValue(undefined);
    }
  }, [field.value]);

  // Manipulador de mudança que processa e formata o valor de entrada
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove qualquer caractere não numérico
    const inputValue = e.target.value.replace(/\D/g, "");

    // Calcula o valor numérico (divisão por 100 para obter reais e centavos)
    let newValue: number | undefined = undefined;
    if (inputValue.length > 0) {
      newValue = parseFloat(inputValue) / 100;
    }

    // Atualiza o state local
    setNumericValue(newValue);

    // Atualiza o valor no formulário (mantendo como número)
    setFieldValue(name, newValue);
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

      <Input
        id={inputId}
        className={`h-8 ${inputStyle} ${className}`}
        aria-invalid={hasError ? "true" : "false"}
        aria-required={required ? "true" : "false"}
        aria-describedby={ariaDescribedBy}
        data-error={hasError ? "true" : "false"}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={field.onBlur}
        value={formatPrice(numericValue)}
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

export default InputPriceField;
