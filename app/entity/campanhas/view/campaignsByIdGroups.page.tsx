import PromoteContactsDialog from '@/features/campanhas/components/dialog/PromoteContactDialog';
import AddGroupsSheet from '@/features/campanhas/components/sheets/addGroupsSheet';
import EditGroupsSheet from '@/features/campanhas/components/sheets/editGroupsSheet';
import { GroupsProviders } from '@/features/campanhas/context/groupsContext/provider';
import EditMemberLimitOnGroupsDialog from '@/features/campanhas/components/dialog/editMemberLimitOnGroups';
import EditImagesOnGroupsDialog from '@/features/campanhas/components/dialog/editImageOnGroups';
import GroupContainer from '@/features/campanhas/components/groupsContainer';
import { SuspenseWrapper } from '@/components/SuspenseWrapper';

export default async function CampaignsByIdGroupsPage() {
  return (
    <GroupsProviders>
      <SuspenseWrapper modal={PromoteContactsDialog} />
      <SuspenseWrapper modal={AddGroupsSheet} />
      <SuspenseWrapper modal={EditGroupsSheet} />
      <SuspenseWrapper modal={EditMemberLimitOnGroupsDialog} />
      <SuspenseWrapper modal={EditImagesOnGroupsDialog} />
      <GroupContainer />
    </GroupsProviders>
  );
}
