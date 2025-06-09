import InputFieldHorizontalSelect from '@/components/ui-modified/horizontalInputField/InputFieldSelectHorizontal';
import InputFieldSwitchHorizontalCheckBox from '@/components/ui-modified/horizontalInputField/InputFieldSwitchHorizontal';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import MyForm from '@/lib/Formik/Form';
import { FormikHelpers } from 'formik';
import { Fragment, useState } from 'react';
import { MdFilterList } from 'react-icons/md';

interface FormValues {
  perPage: string;
  orderBy: string;
}

interface UseFormHandlerProps {
  onSuccess?: (values: FormValues) => void;
  onClear?: () => void;
}
const defaultValues: FormValues = {
  perPage: '100',
  orderBy: 'desc',
};

const useFormHandler = ({ onSuccess, onClear }: UseFormHandlerProps = {}) => {
  const updateURLParams = (values: FormValues) => {
    try {
      const searchParams = new URLSearchParams(window.location.search);

      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          const paramValue = typeof value === 'boolean' ? value.toString() : value;

          if (paramValue === '') {
            searchParams.delete(key);
          } else {
            searchParams.set(key, paramValue);
          }
        }
      });

      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}?${searchParams.toString()}`,
      );
    } catch (error) {
      console.error('Error updating URL parameters:', error);
    }
  };

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    updateURLParams(values);

    if (onSuccess) {
      onSuccess(values);
    }

    actions.setSubmitting(false);
  };

  const clearFilters = (formikHelpers: FormikHelpers<FormValues>) => {
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

  return { handleSubmit, clearFilters };
};

const formKeys: (keyof FormValues)[] = ['perPage', 'orderBy'];

export const getInitialValuesFromURL = (): Partial<FormValues> => {
  if (typeof window === 'undefined') return {};

  const searchParams = new URLSearchParams(window.location.search);
  const initialValues: Record<string, string | boolean> = {};

  searchParams.forEach((value, key) => {
    if (formKeys.includes(key as keyof FormValues)) {
      initialValues[key] = value;
    }
  });

  return initialValues as Partial<FormValues>;
};

export function PopoverAdvancedCampaignsFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, clearFilters } = useFormHandler({
    onSuccess: () => {
      setIsOpen(false);
    },
  });
  const defaultValues: FormValues = {
    perPage: '100',
    orderBy: 'desc',
  };

  const initialValues = {
    ...defaultValues,
    ...getInitialValuesFromURL(),
  };

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <Button size="sm">
          <MdFilterList />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <MyForm initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting, ...formikHelpers }) => (
            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium leading-none">Filtros Avançados</h4>
                  <Button
                    type="button"
                    onClick={() => clearFilters(formikHelpers)}
                    className="h-6 text-sm"
                    variant="outline"
                  >
                    Limpar
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <InputFieldHorizontalSelect
                  label="Itens por página"
                  name="perPage"
                  placeholder="Recentes"
                  hasError={false}
                  options={[
                    { value: '25', label: '25' },
                    { value: '50', label: '50' },
                    { value: '100', label: '100' },
                    { value: '150', label: '150' },
                  ]}
                />
                <InputFieldHorizontalSelect
                  label="Ordem"
                  name="orderBy"
                  placeholder="Recentes"
                  hasError={false}
                  options={[
                    { value: 'asc', label: 'Antigos' },
                    { value: 'desc', label: 'Recentes' },
                  ]}
                />
                <Button type="submit" className="text-sm h-8" disabled={isSubmitting}>
                  Aplicar
                </Button>
              </div>
            </div>
          )}
        </MyForm>
      </PopoverContent>
    </Popover>
  );
}
