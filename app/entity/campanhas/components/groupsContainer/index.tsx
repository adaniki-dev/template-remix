'use client';
import GroupHomeHeader from '@/features/campanhas/components/groupsContainer/components/groupHomeHeader';
import { TableGroups } from '@/features/campanhas/components/groupsContainer/components/groupsTabs/datatable';

export default function GroupContainer() {
  return (
    <div className="grid w-full overflow-hidden p-4 gap-4">
      <GroupHomeHeader />
      <TableGroups />
    </div>
  );
}
