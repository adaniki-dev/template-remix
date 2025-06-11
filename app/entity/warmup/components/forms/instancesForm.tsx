'use client';

import InputFieldCheckBox from '@/components/ui-modified/inputFieldCheckbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MyForm from '@/lib/Formik/Form';
import { Fragment, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';
import toast from '@/lib/Toast/toast';
import { useQueryClient } from '@tanstack/react-query';
import { areArraysTheSame } from '@/lib/utils';
import { useApiMutation, useApiQuery } from '@/core/useAPI';

export default function InstancesForm() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useApiQuery<any>(['getWarmInstances'], 'instance/all');

  const handleSubmit = useApiMutation<any, { instanceIds: string[] }>('groups/warmup-all', 'post', {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['getWarmInstances'],
        refetchType: 'all',
      });

      toast.success('Aquecimento atualizado!');
    },
    onError: () => {
      toast.error('Erro ao atualizar aquecimento!');
    },
  });

  if (isLoading) {
    return (
      <div className="bg-radial-gradient inset-0 w-full h-full absolute flex flex-col items-center justify-center gap-3 transition-all ease-out duration-300">
        <AiOutlineLoading className="text-4xl animate-spin text-primary" />
        <p className="text-lg">Carregando instâncias</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-gray-500">Erro ao carregar instâncias</p>
      </div>
    );
  }

  // const selectedInstances = data
  //   .filter((instance: any) => instance.isEnabled)
  //   .map((instance: any) => instance.id);
  const availableInstances = data.filter((instance: any) => instance.isEnabled);

  return (
    <MyForm
      initialValues={{
        // selectedInstances,
        selectedInstances: [],
        // allInstancesSelected: selectedInstances.length == availableInstances.length,
        allInstancesSelected: false,
      }}
      onSubmit={async (values, actions) =>
        await handleSubmit.mutateAsync(
          { instanceIds: values.selectedInstances },
          { onSettled: () => actions.setSubmitting(false) },
        )
      }
    >
      {({ values, isSubmitting, setFieldValue }) => {
        return (
          <div className="grid gap-4 overflow-auto scrollbar-hide">
            {isSubmitting && (
              <div className="bg-radial-gradient inset-0 w-full h-full absolute flex flex-col items-center justify-center gap-3 transition-all ease-out duration-300">
                <AiOutlineLoading className="text-4xl animate-spin text-primary" />
                <p className="text-lg">Salvando suas alterações</p>
              </div>
            )}

            <p className="text-sm text-grey-500">
              Selecione as instâncias que receberão aquecimento de chip
            </p>

            <InstancesSectionContent
              allInstances={availableInstances}
              selectedInstances={values.selectedInstances}
              setFieldValue={setFieldValue}
            />

            <Button
              // disabled={
              //   isSubmitting || areArraysTheSame(values.selectedInstances, selectedInstances)
              // }
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
            </Button>
            {isSubmitting && (
              <div className="bg-radial-gradient inset-0 w-full h-full absolute flex flex-col items-center justify-center gap-3 transition-all ease-out duration-300">
                <AiOutlineLoading className="text-4xl animate-spin text-primary" />
                <p className="text-lg">Estamos atualizando seu aquecimento de chip</p>
              </div>
            )}
          </div>
        );
      }}
    </MyForm>
  );
}

interface InstancesSectionContentProps {
  allInstances: any[];
  selectedInstances: any[];
  setFieldValue: (field: string, value: any) => void;
}

const InstancesSectionContent = ({
  allInstances,
  selectedInstances,
  setFieldValue,
}: InstancesSectionContentProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [lastSelectedInstances, setLastSelectInstances] = useState(selectedInstances);

  const filteredInstances = allInstances.filter((instance: any) =>
    instance.instanceKey.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleInstanceToggle = (id: string) => {
    const newSelectedInstances = selectedInstances.includes(id)
      ? selectedInstances.filter((uuid: string) => uuid !== id)
      : [...selectedInstances, id];

    setFieldValue('selectedInstances', newSelectedInstances);
  };

  const handleSubmitelectAll = () => {
    if (selectedInstances.length == allInstances.length && allInstances.length != 0) {
      setFieldValue('selectedInstances', lastSelectedInstances);
      return;
    }
    setLastSelectInstances(selectedInstances);

    setFieldValue(
      'selectedInstances',
      allInstances.map((group: any) => group.id),
    );
  };

  return (
    <div className={`flex flex-col gap-4 h-[256px] overflow-y-auto`}>
      <Fragment>
        <div className="flex flex-row justify-center items-center relative w-full">
          <Input
            placeholder="Pesquisar instâncias"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <FaSearch className="absolute right-4" color="grey" />
        </div>

        <InputFieldCheckBox
          key={'selectAll'}
          label={'Selecionar todos'}
          name="allInstancesSelected"
          onClick={handleSubmitelectAll}
          checked={selectedInstances.length == allInstances.length && allInstances.length != 0}
        />

        <div className="flex flex-col gap-3 bg-background w-full h-full rounded-lg p-4">
          {filteredInstances.length > 0 && (
            <>
              {filteredInstances.map((instance: any, index: number) => {
                const isChecked = (selectedInstances as any[]).includes(instance.id);
                return (
                  <InputFieldCheckBox
                    key={instance.id}
                    label={instance.instanceKey}
                    name="selectedInstances"
                    checked={isChecked}
                    onClick={() => handleInstanceToggle(instance.id)}
                    index={index}
                  />
                );
              })}
            </>
          )}
          {filteredInstances.length == 0 && (
            <p className="flex justify-center items-center text-sm text-gray-500">
              {' '}
              Nenhuma instância disponível
            </p>
          )}
        </div>
      </Fragment>
    </div>
  );
};
