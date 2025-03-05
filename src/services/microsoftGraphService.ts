import { Client } from '@microsoft/microsoft-graph-client';
import { AuthCodeCredential } from '@azure/identity';
import { env } from '../config/Environment';
import { logService } from './logService';

export class MicrosoftGraphService {
  private client: Client;

  constructor() {
    const credential = new AuthCodeCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );

    this.client = Client.initWithMiddleware({
      authProvider: async (done) => {
        try {
          const token = await credential.getToken('https://graph.microsoft.com/.default');
          done(null, token.token);
        } catch (error) {
          logService.error('Azure AD token retrieval failed', error);
          done(error);
        }
      }
    });
  }

  async getUserProfile(upn: string) {
    try {
      return await this.client
        .api(`/users/${upn}`)
        .select(['id', 'displayName', 'mail', 'givenName', 'surname'])
        .get();
    } catch (error) {
      logService.error('Failed to fetch user profile', error);
      throw error;
    }
  }

  async searchUsers(searchTerm: string) {
    try {
      return await this.client
        .api('/users')
        .filter(`startswith(displayName,'${searchTerm}') or startswith(mail,'${searchTerm}')`)
        .select(['id', 'displayName', 'mail'])
        .get();
    } catch (error) {
      logService.error('User search failed', error);
      throw error;
    }
  }
}

export const microsoftGraphService = new MicrosoftGraphService();