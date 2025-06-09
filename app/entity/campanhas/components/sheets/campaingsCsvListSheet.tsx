'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useApiQuery } from '@/core/useAPI';
import DataTableCampaignsCsv from '@/features/campanhas/components/campaignsCsvList/datatable';
import { removeSearchParamsInURL } from '@/util/removeSearchParamsInURL';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

type CampaignsCsvListSheetProps = [
  {
    uuid: string;
    url: string;
    created_at: string;
  },
];

export function CampaignsCsvListSheet() {
  const [openSheet, setOpenSheet] = useState(false);
  const searchParams = useSearchParams();
  const campaignsCsv = searchParams.get('campaignsCsv');

  const { data, isLoading, isError } = useApiQuery<CampaignsCsvListSheetProps>(
    ['/campaigns/files', 'campaignsCsv'],
    `/campaigns/files?id=${campaignsCsv}`,
    {
      enabled: !!campaignsCsv,
    },
  );

  const openSheetAction = useCallback(() => {
    setOpenSheet(true);
  }, [openSheet]);

  const openOrCloseSheet = useCallback(() => {
    setOpenSheet((prev) => !prev);
    removeSearchParamsInURL('campaignsCsv');
  }, [openSheet]);

  useEffect(() => {
    if (campaignsCsv) {
      openSheetAction();
    }
  }, [campaignsCsv]);

  return (
    <Sheet open={openSheet} onOpenChange={openOrCloseSheet}>
      <SheetContent className="min-w-[30vw]">
        <SheetHeader>
          <SheetTitle>Histórico de CSV da campanhas</SheetTitle>
          <SheetDescription>Lista de CSVs da campanha que foram emitidas </SheetDescription>
        </SheetHeader>
        <div className="mt-3 h-[80vh] overflow-y-auto">
          {!isLoading && data && data?.length > 0 && (
            <DataTableCampaignsCsv data={data.reverse()} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
