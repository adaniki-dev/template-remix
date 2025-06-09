'use client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { FieldArray, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import ArrayHelperProvider from '@/lib/Formik/ContextFormHelper';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import InputFieldSelect from '@/components/ui-modified/InputFieldSelect';
import { MdFilterList } from 'react-icons/md';
import { formikValidationSchema } from '@/lib/FormikValidationSchema';

const validationSchema = z.object({});

interface FilterSheetProps {
  path: string;
}

interface FiltersForm {
  number: string;
}

export function FilterSheet(props: FilterSheetProps) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const params = useParams();
  const searchParams = useSearchParams();
  const { path } = props;

  const numbers = [
    { label: '25', value: '25' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
    { label: '250', value: '250' },
    { label: '500', value: '500' },
  ];

  const router = useRouter();

  const handleParams = (values: FiltersForm, actions: any) => {
    const { number } = values;

    const newURLWithParams = new URLSearchParams(window.location.search);
    newURLWithParams.set('perPage', number);

    router.push(`${path}?${newURLWithParams.toString()}`);

    handleClose();
  };

  function handleClose() {
    setOpen(!open);
  }

  const defaultValues = {
    number: '25',
  };

  let initialValues = {
    number: searchParams.get('perPage') ?? defaultValues.number,
  };

  const getAppliedFiltersCount = () => {
    let newCountValue = 0;
    if (defaultValues.number != (searchParams.get('perPage') || '25')) newCountValue++;

    setCount(newCountValue);
  };

  useEffect(() => {
    getAppliedFiltersCount();
  }, [searchParams]);

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetTrigger asChild>
        <Button className="relative align-center justify-center w-fit py-1 px-4">
          {count > 0 && <FilterCountBubble count={count} />}
          <MdFilterList size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[100vw] xl:min-w-[40vw] flex flex-col flex-grow">
        <SheetHeader className="mb-2">
          <SheetTitle>Filtros de agendamentos</SheetTitle>
        </SheetHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={formikValidationSchema(validationSchema)}
          onSubmit={handleParams}
        >
          {({ values, setValues }) => {
            const handleReset = () => {
              setValues(defaultValues);
              handleParams(defaultValues, {});
              handleClose();
            };
            return (
              <Form className="flex flex-col flex-grow">
                <FieldArray
                  name="categories"
                  render={(arrayHelpers) => {
                    return (
                      <ArrayHelperProvider arrayHelpers={arrayHelpers}>
                        <div className="flex flex-col flex-grow justify-between">
                          <div className="flex flex-col gap-2 w-full overflow-auto">
                            <InputFieldSelect
                              placeholder="Selecione"
                              label="Número de itens exibidos"
                              options={numbers}
                              value={values.number}
                              name="number"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button className="w-full" type="submit">
                              Aplicar filtros
                            </Button>
                            <Button className="w-full" variant="outline" onClick={handleReset}>
                              Resetar filtros
                            </Button>
                          </div>
                        </div>
                      </ArrayHelperProvider>
                    );
                  }}
                />
              </Form>
            );
          }}
        </Formik>
      </SheetContent>
    </Sheet>
  );
}
function FilterCountBubble({ count }: { count: number }) {
  return (
    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-500 text-white text-xs">
      {count}
    </span>
  );
}
