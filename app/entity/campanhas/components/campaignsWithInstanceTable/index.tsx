'use client';

import { CampaignsWithInstancesContainer } from '@/features/campanhas/components/campaignsWithInstanceTable/campaignsWithInstanceContainer';
import { useCampaignsContext } from '@/features/campanhas/context/campaignsContext';
import { Fragment } from 'react';

export default function CampaignsWithInstanceTable() {
  const { queryCampains } = useCampaignsContext();
  const { data, isLoading, isError } = queryCampains;

  return (
    <div className="w-full flex justify-center gap-4">
      {isLoading && !data && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Carregando...</p>
        </div>
      )}
      {!isLoading && (
        <Fragment>
          {data && data?.data?.length > 0 && <CampaignsWithInstancesContainer data={data?.data} />}
        </Fragment>
      )}
      {data && data?.data && data?.data?.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Nenhuma Campanha registrada</p>
        </div>
      )}
      {isError && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Desculpe! Ocorreu um erro ao carregar os dados</p>
        </div>
      )}
    </div>
  );
}
