import { CardCampaigns } from '@/features/campanhas/components/campaignsWithInstanceTable/campaignsWithInstanceContainer/CardCampaigns';

export function CampaignsWithInstancesContainer({ data }: any) {
  return (
    <div className="flex flex-col gap-6 w-full">
      {data &&
        data.length > 0 &&
        data.map((item: any) => <CardCampaigns key={item.id} data={item} />)}
    </div>
  );
}
