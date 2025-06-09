import { SuspenseWrapper } from '@/components/SuspenseWrapper';
import { TableCampaigns } from '@/features/campanhas/components/campaignContainer/datatable';
import CampaignsHeader from '@/features/campanhas/components/campaignsHeader';
import AddCampaignsSheet from '@/features/campanhas/components/sheets/addCampaignsSheet';
import { CampaignsCsvListSheet } from '@/features/campanhas/components/sheets/campaignsCsvListSheet';
import EditCampaignsSheet from '@/features/campanhas/components/sheets/editCampaignsSheet';
import { CampaignsProviders } from '@/features/campanhas/context/campaignsContext/provider';

export default async function CampaignsPage(props: any) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  return (
    <CampaignsProviders params={params} searchParams={searchParams}>
      <SuspenseWrapper modal={AddCampaignsSheet} />
      <SuspenseWrapper modal={EditCampaignsSheet} />
      <SuspenseWrapper modal={CampaignsCsvListSheet} />
      <div className="flex flex-col w-full overflow-hidden p-4 gap-4">
        <CampaignsHeader />
        <TableCampaigns />
      </div>
    </CampaignsProviders>
  );
}
