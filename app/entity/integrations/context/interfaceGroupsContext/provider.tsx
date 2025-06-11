import { InterfaceGroupProvider } from "@/features/integrations/context/interfaceGroupsContext/context";

export default function InterfaceGroupsProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <InterfaceGroupProvider>
        {children}
    </InterfaceGroupProvider>
  );
}