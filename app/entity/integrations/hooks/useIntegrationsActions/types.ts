export interface postCreateIntegration {
  integrationId: string;
  name: string;
  domain?: string;
  instances?: string[];
  apiSecret?: string;
  token?: string;
}
