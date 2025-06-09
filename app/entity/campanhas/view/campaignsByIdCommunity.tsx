import { SuspenseWrapper } from '@/components/SuspenseWrapper';
import CommunityContainer from '@/features/campanhas/components/communityContainer';
import EditImagesOnCommunityDialog from '@/features/campanhas/components/dialog/editImageOnCommunity';
import EditMemberLimitOnCommunityDialog from '@/features/campanhas/components/dialog/editMemberLimitOnCommunity';
import AddCommunitySheet from '@/features/campanhas/components/sheets/addCommunitySheet';
import EditCommunitySheet from '@/features/campanhas/components/sheets/editCommunitySheet';
import { CommunityProviders } from '@/features/campanhas/context/communityContext/provider';

export default async function CampaignsByIdCommunity() {
  return (
    <CommunityProviders>
      <SuspenseWrapper modal={AddCommunitySheet} />
      <SuspenseWrapper modal={EditCommunitySheet} />
      <SuspenseWrapper modal={EditMemberLimitOnCommunityDialog} />
      <SuspenseWrapper modal={EditImagesOnCommunityDialog} />
      <CommunityContainer />
    </CommunityProviders>
  );
}
