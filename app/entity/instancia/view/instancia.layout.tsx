import InstanceProviders from '../context/instanceContext/provider';

export default async function InstanciaLayout({ children }: { children: React.ReactNode }) {
  return <InstanceProviders>{children}</InstanceProviders>;
}
