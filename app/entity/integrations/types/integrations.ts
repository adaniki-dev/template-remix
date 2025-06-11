export interface IntegrationsProps {
  id: string;
  name: string;
  isEnabled: boolean;
  type: string;
  thumbUrl: string;
  imageUrl: string;
  fields: { [key: string]: any };
  integrationName: string;
  domain?: string;
}

export interface IntegrationsInitialProps {
  id: string;
  name: string;
  isEnabled: boolean;
  type: string;
  thumbUrl: string;
  imageUrl: string;
  fields: string;
  clientIntegrationId: string;
  integrationName: string;
  description: string;
}

export interface IntegrationsQueryProps {
  integrations: IntegrationsInitialProps[];
  clientIntegrations: IntegrationsInitialProps[];
}
