'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/Link';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { useParams, usePathname } from 'next/navigation';

const navigationItems = [
  {
    label: 'Métricas',
    path: 'metricas',
  },
  {
    label: 'Instâncias',
    path: 'instancias',
  },
  {
    label: 'Grupos',
    path: 'grupos',
  },
  {
    label: 'Comunidade',
    path: 'comunidade',
  },
  // {
  //   label: 'Conteúdo',
  //   path: 'conteudo',
  // },
  // {
  //   label: 'Agendamentos',
  //   path: 'agendamentos',
  // },
];

export function CampaignNavigationBar() {
  const pathname = usePathname();
  const params = useParams();
  function isActive(path: string) {
    return pathname.includes(path);
  }
  return (
    <nav className="flex justify-between gap-2">
      <div className="flex items-center">
        {navigationItems.map((item) => (
          <Link
            className={`rounded-md px-4 text-sm ${isActive(item.path) ? 'bg-primary text-primary-foreground' : ''} hover:bg-muted cursor-pointer ease-linear delay-100 transition-all`}
            key={item.path}
            href={`/dashboard/campanhas/${params.campaignsId}/${item.path}`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <Button
        onClick={() => handleAddSearchParamsToUrl('contentMode', 'y')}
        variant="outline"
        size="sm"
      >
        Envie conteúdo ou agende-os
      </Button>
    </nav>
  );
}
