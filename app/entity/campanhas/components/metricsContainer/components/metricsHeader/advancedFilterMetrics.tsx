import InputDatePickerFieldBasicDate from '@/components/ui-modified/horizontalInputField/InputFieldDatePickerBasicDate';
import InputFieldHorizontalSelect from '@/components/ui-modified/horizontalInputField/InputFieldSelectHorizontal';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAdvancedFilter } from '@/features/campanhas/hooks/useAdvancedFilter';
import MyForm from '@/lib/Formik/Form';
import { formikValidationSchema } from '@/lib/FormikValidationSchema';
import { addDays } from 'date-fns';
import { MdFilterList } from 'react-icons/md';
import { z } from 'zod';

interface FormValues {
  since: string;
  order: string;
  startDate: string;
  endDate: string;
}

const defaultValues: FormValues = {
  since: '90',
  order: 'desc',
  startDate: '',
  endDate: '',
};

const formKeys: (keyof FormValues)[] = ['since', 'order', 'startDate', 'endDate'];

const formSchema = z
  .object({
    since: z.string().min(1, 'Campo obrigatório'),
    order: z.string().min(1, 'Campo obrigatório'),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.startDate) {
        return data.endDate && data.endDate.length > 0;
      }
      return true;
    },
    {
      message: 'Data final obrigatória quando data inicial é preenchida',
      path: ['endDate'],
    },
  );

export function PopoverAdvancedMetricsFilter() {
  const { isOpen, setIsOpen, handleSubmit, clearFilters, initialValues } = useAdvancedFilter({
    defaultValues,
    formKeys,
  });

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <Button size="sm">
          <MdFilterList />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <MyForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={formikValidationSchema(formSchema)}
        >
          {({ values, isSubmitting, ...formikHelpers }) => (
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
                <p className="text-sm text-muted-foreground">Filtre as métricas por atributos</p>
              </div>
              <div className="grid gap-2">
                <InputFieldHorizontalSelect
                  label="Período"
                  name="since"
                  placeholder="90"
                  hasError={false}
                  options={[
                    { value: '7', label: '7' },
                    { value: '15', label: '15' },
                    { value: '30', label: '30' },
                    { value: '90', label: '90' },
                  ]}
                />
                {/* <InputFieldHorizontalSelect
                  label="Ordem"
                  name="order"
                  placeholder="Recentes"
                  hasError={false}
                  options={[
                    { value: 'asc', label: 'Antigos' },
                    { value: 'desc', label: 'Recentes' },
                  ]}
                /> */}
                <InputDatePickerFieldBasicDate
                  label="Data Inicial"
                  name="startDate"
                  placeholder="Data Inicial"
                  minDate={new Date('2024-11-28')}
                />
                <InputDatePickerFieldBasicDate
                  label="Data Final"
                  name="endDate"
                  placeholder="Data Final"
                  minDate={addDays(values.startDate, 1) || new Date('2024-11-28')}
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
