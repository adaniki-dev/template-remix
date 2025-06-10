import InputFieldHorizontalSelect from '@/components/ui-modified/horizontalInputField/InputFieldSelectHorizontal';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAdvancedFilter } from '@/features/campanhas/hooks/useAdvancedFilter';
import MyForm from '@/lib/Formik/Form';
import { MdFilterList } from 'react-icons/md';

interface FormValues {
  perPage: string;
  orderBy: string;
}

const formKeys: (keyof FormValues)[] = ['perPage', 'orderBy'];

export function PopoverAdvancedContentsFilter() {
  const defaultValues: FormValues = {
    perPage: '100',
    orderBy: 'desc',
  };

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
