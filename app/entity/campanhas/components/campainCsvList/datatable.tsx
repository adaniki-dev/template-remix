'use client';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { SimpleTable } from '@/components/simpleTable';
import { ColumnsCampaignsCsv } from '@/features/campanhas/components/campaignsCsvList/columns';

export default function DataTableCampaignsCsv({ data }: any) {
  const table = useReactTable<any>({
    data: data as any,
    columns: ColumnsCampaignsCsv,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="overflow-auto">
      <SimpleTable columnsLength={ColumnsCampaignsCsv?.length} table={table} />
    </div>
  );
}
