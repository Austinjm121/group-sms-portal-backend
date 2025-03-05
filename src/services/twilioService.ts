import twilio from 'twilio';
import { env } from '../config/Environment';
import { logService } from './logService';

export class TwilioService {
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
  }

  async sendSMS(to: string, message: string) {
    try {
      const result = await this.client.messages.create({
        body: message,
        from: env.TWILIO_PHONE_NUMBER,
        to: to
      });

      logService.info(`SMS sent to ${to}`, { messageId: result.sid });
      return result;
    } catch (error) {
      logService.error('SMS sending failed', error);
      throw error;
    }
  }

  async validatePhoneNumber(phoneNumber: string) {
    try {
      const phoneNumberInstance = await this.client.lookups.v1.phoneNumbers(phoneNumber).fetch();
      return {
        valid: true,
        formatted: phoneNumberInstance.phoneNumber,
        countryCode: phoneNumberInstance.countryCode
      };
    } catch (error) {
      logService.error('Phone number validation failed', error);
      return { valid: false };
    }
  }
}

export const twilioService = new TwilioService();