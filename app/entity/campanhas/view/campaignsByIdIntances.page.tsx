import { SuspenseWrapper } from '@/components/SuspenseWrapper';
import AddInstanceOnCampaignDialog from '@/features/campanhas/components/dialog/addInstanceOnCampaiogn';
import InstancesContainer from '@/features/campanhas/components/instancesContainer';
import ImportGroupsSheet from '@/features/campanhas/components/sheets/importGroupsFromIntances';
import SendBackupInstanceSheet from '@/features/campanhas/components/sheets/sendBackupInstance';
import { CampaignsInstancesProvider } from '@/features/campanhas/context/instancesContext/context';
import ImportCommunitySheet from '../components/sheets/importCommunityFromInstances';

export default async function CampaignsByIdInstancePage() {
  return (
    <CampaignsInstancesProvider>
      <SuspenseWrapper modal={ImportGroupsSheet} />
      <SuspenseWrapper modal={ImportCommunitySheet} />
      <SuspenseWrapper modal={SendBackupInstanceSheet} />
      <SuspenseWrapper modal={AddInstanceOnCampaignDialog} />
      <InstancesContainer />
    </CampaignsInstancesProvider>
  );
}
