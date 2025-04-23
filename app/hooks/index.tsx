'use client';
import { useEffect, useCallback, useRef } from 'react';
import { debounce } from 'lodash';

interface AutoSaveOptions {
  delay?: number;
  onSaving?: () => void;
  onSaved?: () => void;
  enabled?: boolean;
}

export const useAutoSave = (
  submitForm: () => Promise<any>,
  values: any,
  initialValues: any,
  options: AutoSaveOptions = {},
) => {
  const { delay = 1000, onSaving, onSaved, enabled = true } = options;
  const isFirstRender = useRef(true);
  const isSubmitting = useRef(false);
  const lastSuccessValues = useRef(values);

  const debouncedSubmit = useCallback(
    debounce(async () => {
      if (isSubmitting.current) return;

      try {
        isSubmitting.current = true;
        onSaving?.();
        await submitForm();
        lastSuccessValues.current = values;
        onSaved?.();
      } catch (error) {
        console.error('AutoSave error:', error);
      } finally {
        isSubmitting.current = false;
      }
    }, delay),
    [submitForm, onSaving, onSaved, values],
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const hasChanges = Object.keys(values).some(
      (key) => values[key] !== initialValues[key] && values[key] !== lastSuccessValues.current[key],
    );

    if (enabled && hasChanges && !isSubmitting.current) {
      debouncedSubmit();
    }

    return () => debouncedSubmit.cancel();
  }, [values, debouncedSubmit]);
};
