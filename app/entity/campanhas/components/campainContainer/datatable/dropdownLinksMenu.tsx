'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';
import { toast } from 'sonner';

export default function DropdownLinksMenu({
  name,
  link,
  deeplink = false,
}: {
  name: string;
  link: string;
  deeplink?: boolean;
}) {
  const copyToClipboard = async (e: React.MouseEvent, message: string) => {
    e.preventDefault();
    e.stopPropagation();
    toast.info('Copiado para a área de transferência');
    await navigator.clipboard.writeText(message);
  };

  const isDeepLink = deeplink ? '' : '/groups';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button onClick={(e) => e.stopPropagation()} variant="outline" size="sm">
          {name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Opções</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={(e) => copyToClipboard(e, link + isDeepLink + '?type=group')}>
            Apenas Grupos
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => copyToClipboard(e, link + isDeepLink + '?type=community')}
          >
            Apenas Comunidades
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => copyToClipboard(e, link + isDeepLink + '')}>
            Todos em captação
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
