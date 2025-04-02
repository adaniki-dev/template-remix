import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useField, useForm } from "@/lib/forms/wrapper-form";

interface InputTimePickerFieldProps {
  label: string;
  name: string;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  placeholder?: string;
  minTime?: Date;
  maxTime?: Date;
  disabled?: boolean;
  required?: boolean;
  helpText?: string;
}

/**
 * Componente de seleção de horário para formulários usando FormWrapper
 * Estilizado para parecer com o componente de calendário
 * Retorna apenas o horário como string no formato "HH:MM" ou objeto Date
 *
 * @param label Rótulo do campo
 * @param name Nome do campo no formulário
 * @param className Classes CSS adicionais para o input
 * @param containerClassName Classes CSS adicionais para o container
 * @param labelClassName Classes CSS adicionais para o label
 * @param errorClassName Classes CSS adicionais para a mensagem de erro
 * @param placeholder Texto de placeholder
 * @param minTime Horário mínimo permitido
 * @param maxTime Horário máximo permitido
 * @param disabled Se o campo está desabilitado
 * @param required Se o campo é obrigatório
 * @param helpText Texto de ajuda opcional
 */
const InputTimePickerField: React.FC<InputTimePickerFieldProps> = ({
  label,
  name,
  className = "",
  containerClassName = "",
  labelClassName = "",
  errorClassName = "",
  placeholder = "HH:MM",
  minTime,
  maxTime,
  disabled = false,
  required = false,
  helpText,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useForm();

  const inputId = `time-picker-${name}`;
  const errorId = `${inputId}-error`;
  const helpTextId = helpText ? `${inputId}-helpText` : undefined;

  const hasError = meta.touched && meta.error;
  const errorStyle = hasError ? "" : "opacity-0";

  const handleTimeSelect = (time: Date | null) => {
    setFieldValue(name, time);
  };

  const getDateFromTimeString = (): Date | undefined => {
    if (!field.value) return undefined;

    // Se já for uma string no formato HH:MM
    if (typeof field.value === "string" && /^\d{2}:\d{2}$/.test(field.value)) {
      const [hours, minutes] = field.value.split(":").map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    }

    // Caso ainda seja um objeto Date (compatibilidade)
    if (field.value instanceof Date || typeof field.value === "object") {
      return new Date(field.value);
    }

    return undefined;
  };

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

      <div className="flex">
        <Popover>
          <div className="flex w-full">
            <Input
              id={inputId}
              placeholder={placeholder}
              value={
                field.value
                  ? new Date(field.value).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""
              }
              className={cn(
                "flex-grow",
                hasError ? "border-red-500" : "border-input",
                className,
              )}
              readOnly
              disabled={disabled}
              aria-invalid={hasError ? "true" : "false"}
              aria-required={required ? "true" : "false"}
              aria-describedby={ariaDescribedBy}
              data-error={hasError ? "true" : "false"}
              name={name}
            />
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn("ml-2 px-3")}
                disabled={disabled}
              >
                <Clock className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
          </div>
          <PopoverContent className="w-auto p-0" align="start">
            <DatePicker
              selected={getDateFromTimeString()}
              onChange={handleTimeSelect}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={5}
              timeCaption="Horário"
              dateFormat="HH:mm"
              timeFormat="HH:mm"
              minTime={minTime}
              maxTime={maxTime}
              inline
              {...props}
            />
          </PopoverContent>
        </Popover>
      </div>

      {helpText && (
        <div id={helpTextId} className="text-xs text-gray-500 mt-1">
          {helpText}
        </div>
      )}
    </div>
  );
};

export default InputTimePickerField;
