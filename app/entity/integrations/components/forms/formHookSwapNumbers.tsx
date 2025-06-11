'use client';
import InputBadgeWithSelect from '@/components/ui-modified/InputBadgeWithSelect';
import { Button } from '@/components/ui/button';
import MyForm from '@/lib/Formik/Form';
import { useEffect, useState } from 'react';
import webWorker from '@/hooks/webWorker';
import InputFieldTypePhoneArray from '@/components/ui-modified/InputFieldTypePhoneArray';
import toast from '@/lib/Toast/toast';
import { useHooksActions } from '@/features/integrations/hooks/useHooksActions';
import { useInterfaceGroupsContext } from '@/features/integrations/context/interfaceGroupsContext';

export default function FormSwapNumbers({ hookId }: { hookId: string }) {
  const { interfaceGroupsNumberQueries } = useInterfaceGroupsContext();
  const { swapGroupsAndNumbers } = useHooksActions();
  const [isLoading, setIsLoading] = useState(false);
  const [processedData, setProcessedData] = useState([]);
  const { data: interfaceGroupsNumber } = interfaceGroupsNumberQueries;
  useEffect(() => {
    const processData = async () => {
      if (interfaceGroupsNumber) {
        setIsLoading(true);
        try {
          const worker = new Worker(
            new URL('@/public/workers/groupNumbersToOptions.js', import.meta.url),
          );
          const processedData = await webWorker(worker, interfaceGroupsNumber);
          setProcessedData(processedData);
        } catch (error) {
          console.log('Erro ao processar itens:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    processData();
  }, [interfaceGroupsNumber]);

  function removeEmptyStrings(arr: string[]): string[] {
    return arr.filter((str) => str.trim() !== '');
  }

  function handleSubmit(values: any, actions: any) {
    actions.setSubmitting(false);
    toast.info('Alterando números...');
    values.numbers = removeEmptyStrings(values.numbers);
    values.groups = removeEmptyStrings(values.groups);
    if (values) {
      const groupsObjects = processedData.filter((item: any) => values.groups.includes(item.value));
      const transformedGroupsToData = groupsObjects.map((item: any) => {
        return {
          id: item.value,
          name: item.label,
        };
      });
      swapGroupsAndNumbers(
        {
          groupsList: transformedGroupsToData,
          phones: values.numbers,
          hookId,
        },
        {
          onSuccess: () => {
            toast.success('Grupos alterados com sucesso');
          },
          onError: () => {
            toast.error('Erro ao alterar grupos');
          },
        },
      );
    }
  }
  return (
    <MyForm
      initialValues={{ numbers: [''], groups: [''] }}
      enableReinitialize={true}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
    >
      {({ isSubmitting, values }) => (
        <div className="grid gap-3">
          <div>
            <InputFieldTypePhoneArray
              name="numbers"
              values={values}
              label="Números"
              placeholder="Digite os números responsável"
            />
            <InputBadgeWithSelect
              name="groups"
              label="grupos"
              placeholder="Selecione grupos responsáveis"
              options={
                isLoading
                  ? [
                      {
                        label: 'Carregando...',
                        value: '',
                      },
                    ]
                  : processedData
              }
            />
          </div>
          <Button disabled={isSubmitting} type="submit">
            Adicionar Números
          </Button>
        </div>
      )}
    </MyForm>
  );
}
