import { CampaignByIdHeader } from '@/features/campanhas/components/campaingsById/components/campaignByIdHeader';
import { CampaignsByIdProviders } from '@/features/campanhas/context/campaignsByIdContext/provider';

export default async function CampaignsByIdLayout(props: any) {
  const params = await props.params;

  return (
    <CampaignsByIdProviders campaignsId={params.campaignsId}>
      <div>
        <CampaignByIdHeader campaignId={params.campaignsId} />
        {props.children}
      </div>
    </CampaignsByIdProviders>
  );
}
