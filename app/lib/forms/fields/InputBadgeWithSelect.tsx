import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoMdClose } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { useField, useForm } from "@/lib/forms/wrapper-form";

interface Option {
  value: string;
  label: string;
  id?: string;
}

interface InputBadgeWithSelectProps {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  title?: string;
  search?: string;
  emptyList?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
  required?: boolean;
}

export default function InputBadgeWithSelect({
  name,
  label,
  options = [],
  placeholder = "Selecione opções...",
  title = "Selecione",
  search = "Buscar...",
  emptyList = "Nenhuma opção encontrada",
  containerClassName = "",
  labelClassName = "",
  errorClassName = "",
  helpText,
  required = false,
}: InputBadgeWithSelectProps) {
  const { setFieldValue } = useForm();
  const [field, meta] = useField(name);
  const [open, setOpen] = useState(false);
  const [badges, setBadges] = useState<Option[]>([]);
  const [availableOptions, setAvailableOptions] = useState<Option[]>([]);

  const inputId = `badge-select-${name}`;
  const errorId = `${inputId}-error`;
  const helpTextId = helpText ? `${inputId}-helpText` : undefined;

  const hasError = meta.touched && meta.error;
  const errorStyle = hasError ? "" : "opacity-0";
  const inputStyle = hasError ? "border-red-500" : "border-primary";

  // Inicializa as opções disponíveis a partir das props
  useEffect(() => {
    // Se já temos badges, filtramos as opções disponíveis
    if (badges.length > 0) {
      const badgeValues = badges.map((badge) => badge.value);
      setAvailableOptions(
        options.filter((opt) => !badgeValues.includes(opt.value)),
      );
    } else {
      setAvailableOptions(options);
    }
  }, [options]);

  // Inicializa badges com base no valor do campo, se existir
  useEffect(() => {
    if (
      field.value &&
      Array.isArray(field.value) &&
      field.value.length > 0 &&
      badges.length === 0
    ) {
      const initialBadges = field.value.map((value) => {
        const option = options.find((opt) => opt.value === value);
        return option || { value, label: value };
      });

      setBadges(initialBadges);

      // Atualiza as opções disponíveis
      const selectedValues = initialBadges.map((badge) => badge.value);
      setAvailableOptions(
        options.filter((opt) => !selectedValues.includes(opt.value)),
      );
    }
  }, [field.value, options]);

  function handleAddAttribute(option: Option) {
    setBadges((prevBadges) => [...prevBadges, option]);
    setAvailableOptions((prevOptions) =>
      prevOptions.filter((opt) => opt.value !== option.value),
    );
    setOpen(false); // Fecha o popover ao selecionar
  }

  // Atualiza o valor do campo quando badges mudam
  useEffect(() => {
    setFieldValue(
      name,
      badges.map((badge) => badge.value),
    );
  }, [badges, setFieldValue, name]);

  function removeBadge(index: number) {
    const removedBadge = badges[index];
    const newBadges = badges.filter((_, i) => i !== index);
    setBadges(newBadges);
    setAvailableOptions((prevOptions) => [...prevOptions, removedBadge]);
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
  }

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

      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <div
            id={inputId}
            className={`flex flex-wrap gap-2 border ${inputStyle} h-auto min-h-8 px-4 py-1 rounded-md bg-white items-center w-full cursor-pointer`}
            aria-invalid={hasError ? "true" : "false"}
            aria-required={required ? "true" : "false"}
            aria-describedby={ariaDescribedBy}
            data-error={hasError ? "true" : "false"}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(true);
              }
            }}
          >
            {badges.length === 0 && (
              <span className="text-muted-foreground text-gray-500">
                {placeholder}
              </span>
            )}
            {badges.map((badge, index) => (
              <Badge
                key={index}
                className="bg-primary text-xs text-primary-foreground px-2 py-[2px] rounded-md flex items-center gap-2"
              >
                {badge.label}
                <IoMdClose
                  onClick={(e) => {
                    e.stopPropagation();
                    removeBadge(index);
                  }}
                  className="text-white cursor-pointer"
                  aria-label={`Remover ${badge.label}`}
                />
              </Badge>
            ))}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-center leading-none">{title}</h4>
            </div>
            <div className="grid gap-2">
              <Command>
                <CommandInput placeholder={search} />
                <CommandEmpty>{emptyList}</CommandEmpty>
                <CommandList>
                  {availableOptions.map((option) => (
                    <CommandItem
                      className="capitalize hover:bg-gray-100"
                      key={option.value}
                      onSelect={() => handleAddAttribute(option)}
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {helpText && (
        <div id={helpTextId} className="text-xs text-gray-500 mt-1">
          {helpText}
        </div>
      )}
    </div>
  );
}
