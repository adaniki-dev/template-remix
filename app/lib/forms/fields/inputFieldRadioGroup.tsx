import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useField, useForm } from "@/lib/forms/wrapper-form";

interface Option {
  value: string;
  label: string;
}

interface RadioGroupFieldProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroup> {
  label: string;
  options: Option[];
  defaultValue?: string;
  required?: boolean;
  orientation?: "vertical" | "horizontal";
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
}

const InputRadioGroupField: React.FC<RadioGroupFieldProps> = ({
  label,
  name = "",
  options,
  defaultValue,
  required = false,
  orientation = "vertical",
  containerClassName = "",
  labelClassName = "",
  errorClassName = "",
  helpText,
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useForm();

  const inputId = `radio-group-${name}`;
  const errorId = `${inputId}-error`;
  const helpTextId = helpText ? `${inputId}-helpText` : undefined;

  const hasError = meta.touched && meta.error;
  const errorStyle = hasError ? "" : "opacity-0";

  const orientationClass =
    orientation === "horizontal" ? "flex-row" : "flex-col";

  const handleChange = (value: string) => {
    setFieldValue(name, value);
    setFieldTouched(name, true);
  };

  const ariaDescribedBy =
    [helpTextId, hasError ? errorId : undefined].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={`grid gap-2 ${containerClassName}`}>
      <div className="flex items-center justify-between">
        <Label className={`text-sm font-medium ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>

        <div
          id={errorId}
          className={`text-xs text-end h-3 text-red-500 ${errorStyle} ${errorClassName}`}
          aria-live="polite"
        >
          {meta.error}
        </div>
      </div>

      <RadioGroup
        defaultValue={defaultValue}
        value={field.value || ""}
        onValueChange={handleChange}
        className={`flex ${orientationClass}`}
        aria-describedby={ariaDescribedBy}
        aria-required={required ? "true" : "false"}
        aria-invalid={hasError ? "true" : "false"}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className={`flex items-center space-x-2 ${
              orientation === "vertical" ? "mb-2" : "mr-4"
            }`}
          >
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
            />
            <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>

      {helpText && (
        <div id={helpTextId} className="text-xs text-gray-500 mt-1">
          {helpText}
        </div>
      )}
    </div>
  );
};

export default InputRadioGroupField;
