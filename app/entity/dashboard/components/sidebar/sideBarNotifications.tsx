'use client';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NotificationPopover } from '@/features/dashboard/components/sidebar/notificationPopover';
import { ProcessPopover } from '@/features/dashboard/components/sidebar/processPopover';

export function NavNotifications() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Notificações</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem className="group/collapsible grid gap-2">
          <SidebarMenuButton asChild>
            <NotificationPopover />
          </SidebarMenuButton>
          {/* <SidebarMenuButton asChild>
            <ProcessPopover />
          </SidebarMenuButton> */}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
