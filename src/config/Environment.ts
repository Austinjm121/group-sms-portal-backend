import dotenv from 'dotenv';
import { z } from 'zod';

// Environment variables schema
const envSchema = z.object({
  PORT: z.string().optional().default('3001'),
  MONGODB_URI: z.string(),
  TWILIO_ACCOUNT_SID: z.string(),
  TWILIO_AUTH_TOKEN: z.string(),
  TWILIO_PHONE_NUMBER: z.string(),
  AZURE_TENANT_ID: z.string(),
  AZURE_CLIENT_ID: z.string(),
  AZURE_CLIENT_SECRET: z.string(),
  JWT_SECRET: z.string(),
});

// Type for environment variables
export type Env = z.infer<typeof envSchema>;

// Load and validate environment variables
export function loadEnvironmentVariables(): Env {
  dotenv.config();

  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('Invalid environment configuration:', error);
    process.exit(1);
  }
}

// Singleton to access environment variables
export const env = loadEnvironmentVariables();