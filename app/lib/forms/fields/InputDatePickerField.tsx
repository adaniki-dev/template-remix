"use client";

import React, { useState, useEffect } from "react";
import { format, parse, isValid } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ptBR } from "date-fns/locale";
import { useField, useForm } from "@/lib/forms/wrapper-form";

interface InputDatePickerFieldProps {
  id?: string;
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: Date;
  minDate?: Date;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
  className?: string;
}

const InputDatePickerField: React.FC<InputDatePickerFieldProps> = ({
  id,
  label,
  name,
  placeholder = "DD/MM/AAAA",
  defaultValue = new Date(),
  minDate,
  required = false,
  containerClassName = "",
  labelClassName = "",
  errorClassName = "",
  helpText,
  className = "",
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useForm();
  const [inputValue, setInputValue] = useState("");

  const inputId = id || name;
  const errorId = `${inputId}-error`;
  const helpTextId = helpText ? `${inputId}-helpText` : undefined;

  const hasError = meta.touched && meta.error;
  const errorStyle = hasError ? "" : "opacity-0";
  const inputStyle = hasError ? "border-red-500" : "border-primary";

  const ariaDescribedBy =
    [helpTextId, hasError ? errorId : undefined].filter(Boolean).join(" ") ||
    undefined;

  useEffect(() => {
    if (field.value) {
      setInputValue(format(new Date(field.value), "dd/MM/yyyy"));
    }
  }, [field.value]);

  const formatDateInput = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    let formattedValue = "";
    for (let i = 0; i < numericValue.length && i < 8; i++) {
      if (i === 2 || i === 4) formattedValue += "/";
      formattedValue += numericValue[i];
    }
    return formattedValue;
  };

  const setTodayDate = () => {
    const today = new Date();
    if (!minDate || today >= minDate) {
      setFieldValue(name, today);
      setInputValue(format(today, "dd/MM/yyyy"));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatDateInput(rawValue);
    setInputValue(formattedValue);

    if (formattedValue.length === 10) {
      const parsedDate = parse(formattedValue, "dd/MM/yyyy", new Date());
      if (isValid(parsedDate) && (!minDate || parsedDate >= minDate)) {
        setFieldValue(name, parsedDate);
      } else {
        setTodayDate();
      }
    } else {
      setFieldValue(name, null);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFieldTouched(name, true);

    if (!inputValue || inputValue.length === 0) {
      setTodayDate();
    }
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (date && (!minDate || date >= minDate)) {
      setFieldValue(name, date);
      setInputValue(format(date, "dd/MM/yyyy"));
    } else if (!date) {
      setTodayDate();
    }
    setFieldTouched(name, true);
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

      <div className="flex">
        <Input
          id={inputId}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoComplete="bday"
          className={`h-8 ${inputStyle} ${className}`}
          aria-invalid={hasError ? "true" : "false"}
          aria-required={required ? "true" : "false"}
          aria-describedby={ariaDescribedBy}
          data-error={hasError ? "true" : "false"}
          maxLength={10}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="ml-2 px-3 h-8"
              aria-label="Selecione uma data"
              type="button"
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={field.value ? new Date(field.value) : undefined}
              onSelect={handleCalendarSelect}
              defaultMonth={field.value ? new Date(field.value) : defaultValue}
              disabled={minDate ? (date) => date < minDate : undefined}
              locale={ptBR}
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

export default InputDatePickerField;
