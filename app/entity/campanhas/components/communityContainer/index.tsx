import CommunityTabs from '@/features/campanhas/components/communityContainer/components/communityTabs';
import ComunityHomeHeader from '@/features/campanhas/components/communityContainer/components/comunityHomeHeader';

export default function CommunityContainer() {
  return (
    <div className="grid w-full overflow-hidden p-4 gap-4">
      <ComunityHomeHeader />
      <CommunityTabs />
    </div>
  );
}
