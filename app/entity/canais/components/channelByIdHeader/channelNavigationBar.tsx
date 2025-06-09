'use client';

import { Link } from '@/components/ui/Link';
import { useParams, usePathname } from 'next/navigation';

const navigationItems = [
  {
    label: 'Conteúdo',
    path: 'conteudo',
  },
  // {
  //   label: 'Agendamentos',
  //   path: 'agendamentos',
  // },
];

export function ChannelNavigationBar() {
  const pathname = usePathname();
  const params = useParams();
  function isActive(path: string) {
    return pathname.includes(path);
  }
  return (
    <nav className=" flex gap-2">
      {navigationItems.map((item) => (
        <Link
          className={`rounded-md px-4 text-sm ${isActive(item.path) ? 'bg-primary text-primary-foreground' : ''} hover:bg-muted cursor-pointer ease-linear delay-100 transition-all`}
          key={item.path}
          href={`/dashboard/canal/${params.newsletterId}/${item.path}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
