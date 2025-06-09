import { ColumnsCampaignsInstances } from '@/features/campanhas/components/campaignsWithInstanceTable/datatable/columns';
import DataTableCampaignsInstances from '@/features/campanhas/components/campaignsWithInstanceTable/datatable/datatable';
import { Fragment } from 'react';

export function TableCampaignsInstances({ instances }: any) {
  return (
    <Fragment>
      {instances && instances.length > 0 && (
        <DataTableCampaignsInstances columns={ColumnsCampaignsInstances} data={instances} />
      )}
      {instances && instances.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Nenhuma instância cadastrada</p>
        </div>
      )}
    </Fragment>
  );
}
