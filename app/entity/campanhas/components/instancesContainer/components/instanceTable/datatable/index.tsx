'use client';
import { ColumnsInstancesInGroups } from './columns';
import DataTableInstancesInGroups from './datatable';
import PaginationInstances from './pagination';
import { useCampaignsInstancesContext } from '@/features/campanhas/context/instancesContext';

export default function InstancesTabs() {
  const { data, isLoading, isError } = useCampaignsInstancesContext().queryInstances;

  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  if (isError && !data) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500">Desculpe! Ocorreu um erro na procura de suas instâncias</p>
      </div>
    );
  }

  if (data && data.data && data.data.length <= 0) {
    return (
      <div className="flex justify-center items-center h-96 text-center">
        <p className="text-gray-500">
          Não tem nenhuma instâncias nessa campanha! <br /> Por favor adicione instâncias a
          campanha.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center gap-4">
      {!isLoading && data && data.data && data.data.length > 0 && (
        <>
          <DataTableInstancesInGroups columns={ColumnsInstancesInGroups} data={data.data} />

          <div className="flex w-full justify-center items-center">
            <PaginationInstances />
          </div>
        </>
      )}
    </div>
  );
}
