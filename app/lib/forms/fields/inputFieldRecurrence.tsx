import React, { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useField, useForm } from "@/lib/forms/wrapper-form";
import InputCheckboxField from "@/lib/forms/fields/inputFieldCheckbox";

export enum SchedulingOptionEnum {
  DAILY = "Todos os dias",
  MONDAY = "Segunda-feira",
  TUESDAY = "Terça-feira",
  WEDNESDAY = "Quarta-feira",
  THURSDAY = "Quinta-feira",
  FRIDAY = "Sexta-feira",
  SATURDAY = "Sábado",
  SUNDAY = "Domingo",
}

interface RecurrenceFieldProps {
  label?: string;
  name: string;
  enabledName: string;
  className?: string;
  checkboxLabel?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
}

/**
 * Componente de campo de recorrência para formulários usando o FormWrapper
 *
 * @param label Rótulo opcional para o campo
 * @param name Nome do campo para armazenar dias selecionados
 * @param enabledName Nome do campo para o estado habilitado/desabilitado
 * @param className Classes CSS adicionais
 * @param checkboxLabel Rótulo para o checkbox de habilitar recorrência
 */
const InputRecurrenceField: React.FC<RecurrenceFieldProps> = ({
  label,
  name,
  enabledName,
  className = "",
  checkboxLabel = "Adicionar recorrência",
  containerClassName = "",
  labelClassName = "",
  errorClassName = "",
  helpText,
}) => {
  const [field, meta] = useField(name);
  const [enabledField] = useField(enabledName);
  const { setFieldValue } = useForm();

  const inputId = `recurrence-${name}`;
  const errorId = `${inputId}-error`;
  const helpTextId = helpText ? `${inputId}-helpText` : undefined;

  const hasError = meta.touched && meta.error;
  const errorStyle = hasError ? "" : "opacity-0";

  // Garantir que field.value seja sempre um array
  const selectedDays = Array.isArray(field.value) ? field.value : [];

  const handleDayToggle = (day: SchedulingOptionEnum): void => {
    let newSelectedDays: string[];

    if (day === SchedulingOptionEnum.DAILY) {
      // Se "Todos os dias" for selecionado, removemos todas as outras opções
      newSelectedDays = [day];
    } else {
      // Se outro dia for selecionado
      if (selectedDays.includes(day)) {
        // Se o dia já estiver selecionado, remova-o
        newSelectedDays = selectedDays.filter((d) => d !== day);
      } else {
        // Se o dia não estiver selecionado, adicione-o e remova "Todos os dias" se estiver presente
        newSelectedDays = [...selectedDays, day].filter(
          (d) => d !== SchedulingOptionEnum.DAILY,
        );
      }
    }

    setFieldValue(name, newSelectedDays);
  };

  const schedulingOptions = useMemo(
    () => Object.values(SchedulingOptionEnum),
    [],
  );

  const ariaDescribedBy =
    [helpTextId, hasError ? errorId : undefined].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={`grid gap-1 ${containerClassName} ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <Label className={`text-sm ${labelClassName}`} htmlFor={inputId}>
            {label}
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

      <div className="flex flex-col gap-4" aria-describedby={ariaDescribedBy}>
        <InputCheckboxField label={checkboxLabel} name={enabledName} />

        {enabledField.value && (
          <div
            className="flex flex-row gap-2 flex-wrap"
            role="group"
            aria-labelledby={label ? inputId : undefined}
          >
            {schedulingOptions.map((item) => {
              const isSelected = selectedDays.includes(item);
              return (
                <Badge
                  key={item}
                  className={
                    isSelected
                      ? "py-2 px-4 font-bold text-white"
                      : "py-2 px-4 font-semibold border border-gray-500 bg-grey-300"
                  }
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => handleDayToggle(item as SchedulingOptionEnum)}
                  tabIndex={0}
                  role="checkbox"
                  aria-checked={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleDayToggle(item as SchedulingOptionEnum);
                    }
                  }}
                >
                  {item}
                </Badge>
              );
            })}
          </div>
        )}
      </div>

      {helpText && (
        <div id={helpTextId} className="text-xs text-gray-500 mt-1">
          {helpText}
        </div>
      )}
    </div>
  );
};

export default InputRecurrenceField;
