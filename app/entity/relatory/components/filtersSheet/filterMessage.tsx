'use client';
import InputDatePickerField from '@/components/ui-modified/datePicker';
import InputFieldSelect from '@/components/ui-modified/InputFieldSelect';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import MyForm from '@/lib/Formik/Form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FilterMessage() {
  const searchParams = useSearchParams();
  const [openSheet, setOpenSheet] = useState(false);
  const filter = searchParams.get('filter');
  const router = useRouter();
  const pathname = usePathname();

  function handleRemoveSearchParamsVariant() {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('filter');
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
  }

  function handleCloseSheet() {
    setOpenSheet(false);
    handleRemoveSearchParamsVariant();
  }

  const handleParams = (values: any, actions: any) => {
    const { type, perPage, startDate, endDate, clientIntegrationId } = values;

    const newURLWithParams = new URLSearchParams(window.location.search);
    if (perPage) newURLWithParams.set('perPage', perPage);
    if (type) newURLWithParams.set('type', type);
    if (startDate) newURLWithParams.set('startDate', startDate);
    if (endDate) newURLWithParams.set('endDate', endDate);
    if (clientIntegrationId) newURLWithParams.set('clientIntegrationId', clientIntegrationId);
    newURLWithParams.delete('filter');
    router.push(`${pathname}?${newURLWithParams.toString()}`);
    setOpenSheet(false);
  };

  useEffect(() => {
    if (filter) {
      setOpenSheet(true);
    }
  }, [filter, setOpenSheet]);

  return (
    <Sheet open={openSheet} onOpenChange={handleCloseSheet}>
      <SheetContent className="min-w-[40vw]">
        <SheetTitle>Filtros</SheetTitle>
        <SheetDescription>Filtros para mensagems e gráficos</SheetDescription>
        <MyForm
          onSubmit={(values, actions) => {
            handleParams(values, actions);
          }}
          initialValues={{
            type: '30',
            perPage: '25',
            startDate: '',
            endDate: '',
            clientIntegrationId: '',
          }}
        >
          {({ values, handleChange }) => (
            <div className="grid gap-4 mt-4">
              <InputFieldSelect
                name="type"
                label="Períodos"
                placeholder="Selecione um período"
                options={[
                  {
                    value: 'today',
                    label: 'Hoje',
                  },
                  {
                    value: '7',
                    label: '7 dias',
                  },
                  {
                    value: '15',
                    label: '15 dias',
                  },
                  {
                    value: '30',
                    label: '30 dias',
                  },
                  {
                    value: 'custom',
                    label: 'Personalizado',
                  },
                ]}
              />
              <div className="grid grid-cols-2 gap-4">
                <InputDatePickerField
                  name="startDate"
                  label="Data inicial"
                  placeholder="Data inicial"
                />
                <InputDatePickerField name="endDate" label="Data final" placeholder="Data Final" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputFieldSelect
                  name="perPage"
                  label="Tamanho da página"
                  placeholder="Selecione um tamanho"
                  options={[
                    {
                      value: '25',
                      label: '25',
                    },
                    {
                      value: '50',
                      label: '50',
                    },
                    {
                      value: '100',
                      label: '100',
                    },
                  ]}
                />
                <InputFieldSelect
                  name="clientIntegrationId"
                  label="Integração"
                  placeholder="Selecione uma integração"
                  options={[
                    {
                      value: 'WHMCS',
                      label: 'WHMCS',
                    },
                  ]}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="default" className="w-full">
                  Aplicar Filtrar
                </Button>
              </div>
            </div>
          )}
        </MyForm>
      </SheetContent>
    </Sheet>
  );
}
