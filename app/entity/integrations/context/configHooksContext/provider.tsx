import { ConfigHookProvider } from "@/features/integrations/context/configHooksContext/context";

export default function ConfigHooksProviders({
    params,
    children
}: {
    children: React.ReactNode;
    params: { integrationId: string; clientIntegrationId: string };
}){
    return(
        <ConfigHookProvider integrationId={params.integrationId} clientIntegrationId={params.clientIntegrationId}>
            {children}
        </ConfigHookProvider>
    )
}