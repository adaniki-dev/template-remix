'use client';
import React, { createContext, useState } from 'react';
interface GroupsProvidersProps {
  queryGroups: any;
  queryInstances: any;
  children: React.ReactNode;
}

interface GroupsContextProps {
  queryGroups: any;
  queryInstances: any;
  editGroupsIds: any;
  setEditGroupsIds: any;
  setMemberLimitGroups: any;
  memberLimitGroups: any;
  setImageGroups: any;
  imageGroups: any;
}

export const GroupsContext = createContext<GroupsContextProps>({
  queryGroups: {
    data: null,
  } as any,
  queryInstances: {
    data: null,
  } as any,
  editGroupsIds: {
    instanceId: null,
    groupsIds: [],
  },
  setEditGroupsIds: () => {},
  setMemberLimitGroups: () => {},
  memberLimitGroups: null,
  setImageGroups: () => {},
  imageGroups: null,
});

export const GroupsProvider = ({ children, queryGroups, queryInstances }: GroupsProvidersProps) => {
  const [editGroupsIds, setEditGroupsIds] = useState<{
    instanceId: string | null;
    groupsIds: string[];
  }>({
    instanceId: null,
    groupsIds: [],
  });

  const [memberLimitGroups, setMemberLimitGroups] = useState<any>({
    instanceId: null,
    groupsIds: [],
  });

  const [imageGroups, setImageGroups] = useState<any>({
    instanceId: null,
    groupsIds: [],
  });

  return (
    <GroupsContext.Provider
      value={{
        queryGroups,
        queryInstances,
        editGroupsIds,
        setEditGroupsIds,
        memberLimitGroups,
        setMemberLimitGroups,
        setImageGroups,
        imageGroups,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};
