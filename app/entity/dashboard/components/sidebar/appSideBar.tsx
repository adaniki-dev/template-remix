'use client';

import * as React from 'react';
import {
  LifeBuoy,
  LayoutDashboard,
  Smartphone,
  ToyBrick,
  ChartBarIcon,
  Flame,
  Cable,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavSecondary } from '@/features/dashboard/components/sidebar/sideBarSecondary';
import { NavUser } from '@/features/dashboard/components/sidebar/sideBarUser';
import AutonotifyLogo from '@/public/images/autonotify-logo.svg';
import Image from 'next/image';
import { NavNotifications } from '@/features/dashboard/components/sidebar/sideBarNotifications';
import { NavMain } from '@/features/dashboard/components/sidebar/sideBarMain';
import { FaWhatsapp } from 'react-icons/fa';

const data = {
  navSecondary: [
    {
      title: 'Suporte',
      url: '/dashboard/tickets/1',
      icon: LifeBuoy,
    },
    {
      title: 'Processos',
      url: '/dashboard/processos',
      icon: LayoutDashboard,
    },
  ],
};

const whats = [
  {
    title: 'Whatsapp',
    url: '/dashboard',
    icon: FaWhatsapp,
    isActive: true,
    items: [
      {
        title: 'Meus Notifys',
        url: '/dashboard/instancia',
      },
      {
        title: 'Conteúdos',
        url: '/dashboard/conteudos',
      },
      {
        title: 'Agendamentos',
        url: '/dashboard/agendamento',
      },
      {
        title: 'Campanhas',
        url: '/dashboard/campanhas',
      },
      {
        title: 'Canais',
        url: '/dashboard/canal',
      },
      {
        title: 'Contatos',
        url: '/dashboard/contatos',
      },
      {
        title: 'Warmup',
        url: '/dashboard/warmup',
      },
    ],
  },
];

const integrações = [
  {
    title: 'Lojas de aplicativos',
    url: '/dashboard',
    icon: Cable,
    isActive: true,
    items: [
      {
        title: 'Meus aplicativos',
        url: '/dashboard/integracoes',
      },

      {
        title: 'Relatórios',
        url: '/dashboard/relatory/1',
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard/">
                <Image src={AutonotifyLogo} alt="Autonotify" height={30} width={160} />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavNotifications />
        <NavMain name="Menu" items={whats} />
        <NavMain name="Menu" items={integrações} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
