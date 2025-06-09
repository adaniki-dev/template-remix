'use client';
import { FormikHelpers } from 'formik';
import { useState } from 'react';

interface UseAdvancedFilterOptions<T> {
  defaultValues: T;
  formKeys: (keyof T)[];
  booleanFields?: (keyof T)[];
  onSuccess?: (values: T) => void;
  onClear?: () => void;
}

interface UseAdvancedFilterReturn<T> {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  handleSubmit: (values: T, actions: FormikHelpers<T>) => void;
  clearFilters: (formikHelpers: FormikHelpers<T>) => void;
  initialValues: T;
}

export function useAdvancedFilter<T extends Record<string, any>>({
  defaultValues,
  formKeys,
  booleanFields = [],
  onSuccess,
  onClear,
}: UseAdvancedFilterOptions<T>): UseAdvancedFilterReturn<T> {
  const [isOpen, setIsOpen] = useState(false);

  const updateURLParams = (values: T) => {
    try {
      const searchParams = new URLSearchParams(window.location.search);

      Object.entries(values).forEach(([key, value]) => {
        // Ignora valores undefined, null, strings vazias e booleanos false
        if (
          value !== undefined &&
          value !== null &&
          value !== '' &&
          !(typeof value === 'boolean' && !value)
        ) {
          const paramValue = typeof value === 'boolean' ? value.toString() : value;
          searchParams.set(key, paramValue);
        } else {
          // Remove o parâmetro se ele existir
          searchParams.delete(key);
        }
      });

      // Remove a query string se não houver parâmetros
      const queryString = searchParams.toString();
      const newURL = queryString
        ? `${window.location.pathname}?${queryString}`
        : window.location.pathname;

      window.history.replaceState(null, '', newURL);
    } catch (error) {
      console.error('Error updating URL parameters:', error);
    }
  };

  const handleSubmit = (values: T, actions: FormikHelpers<T>) => {
    updateURLParams(values);

    if (onSuccess) {
      onSuccess(values);
    }

    setIsOpen(false);
    actions.setSubmitting(false);
  };

  const clearFilters = (formikHelpers: FormikHelpers<T>) => {
    try {
      window.history.replaceState(null, '', window.location.pathname);
      formikHelpers.resetForm({
        values: defaultValues,
      });
      if (onClear) {
        onClear();
      }
    } catch (error) {
      console.error('Error clearing filters:', error);
    }
  };

  const getInitialValuesFromURL = (): Partial<T> => {
    if (typeof window === 'undefined') return {};

    const searchParams = new URLSearchParams(window.location.search);
    const initialValues: Record<string, any> = {};

    searchParams.forEach((value, key) => {
      if (formKeys.includes(key as keyof T)) {
        if (booleanFields.includes(key as keyof T)) {
          // Só adiciona o valor booleano se for true
          if (value === 'true') {
            initialValues[key] = true;
          }
        } else {
          initialValues[key] = value;
        }
      }
    });

    return initialValues as Partial<T>;
  };

  const initialValues = {
    ...defaultValues,
    ...getInitialValuesFromURL(),
  } as T;

  return {
    isOpen,
    setIsOpen,
    handleSubmit,
    clearFilters,
    initialValues,
  };
}
