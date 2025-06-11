'use client';
import { Link } from '@/components/ui/Link';
import { useParams, usePathname } from 'next/navigation';

export default function IntegrationHeader({ isAdm }: any) {
  const pathname = usePathname();
  const params = useParams();
  function isActive(path: string) {
    return pathname.includes(path);
  }

  const navigationItems = (verify: any) => {
    return [
      {
        label: 'Instâncias',
        path: 'instancias',
      },
      ...(verify
        ? [
            {
              label: 'Hooks',
              path: 'hooksClient',
            },
            {
              label: 'Hooks Administrativos',
              path: 'hooksAdmin',
            },
          ]
        : [
            {
              label: 'Hooks',
              path: 'hooksClient',
            },
          ]),
      {
        label: 'Templates',
        path: 'templatesClient',
      },
      ...(verify
        ? [
            {
              label: 'Templates Administrativos',
              path: 'templatesAdmin',
            },
          ]
        : []),
      {
        label: 'Configurações',
        path: 'configuracoes',
      },
    ];
  };

  return (
    <nav className=" flex gap-2">
      {navigationItems(isAdm).map((item) => (
        <Link
          className={`rounded-md px-3 text-sm ${isActive(item.path) ? 'bg-primary text-primary-foreground' : ''} hover:bg-muted cursor-pointer ease-linear delay-100 transition-all`}
          key={item.path}
          href={`/dashboard/integracoes/${params.integrationId}/${params.clientIntegrationId}/detalhes/${item.path}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
