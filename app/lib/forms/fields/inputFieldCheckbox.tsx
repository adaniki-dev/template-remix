import React, { ComponentPropsWithoutRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useField, useForm } from "@/lib/forms/wrapper-form";

interface CheckboxFieldProps
  extends Omit<
    ComponentPropsWithoutRef<typeof Checkbox>,
    "checked" | "onCheckedChange"
  > {
  label: string;
  name: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  index?: number;
  onClick?: () => void;
}

const InputCheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  name,
  containerClassName = "",
  labelClassName = "",
  errorClassName = "",
  index = 0,
  onClick,
  id,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useForm();

  const inputId = id || `${name}-${index}`;
  const errorId = `${inputId}-error`;

  const hasError = meta.touched && meta.error;
  const errorStyle = hasError ? "" : "opacity-0";

  const isChecked =
    typeof field.value === "string"
      ? field.value === "true"
      : Boolean(field.value);

  const handleChange = (checked: boolean | "indeterminate") => {
    setFieldValue(name, checked === true);

    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      <div className="flex flex-row gap-2 items-center">
        <Checkbox
          id={inputId}
          checked={isChecked}
          onCheckedChange={handleChange}
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={hasError ? errorId : undefined}
          {...props}
        />
        <Label
          htmlFor={inputId}
          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${labelClassName}`}
        >
          {label}
        </Label>
      </div>

      <div
        id={errorId}
        className={`text-xs text-red-500 ${errorStyle} ${errorClassName}`}
        aria-live="polite"
      >
        {meta.error}
      </div>
    </div>
  );
};

export default InputCheckboxField;
