import dotenv from 'dotenv';

dotenv.config();

const defaulted = {
  PORT: '4000',
  KEY: undefined,
  SECRET: undefined,
  PUBNUB_SUBSCRIBE_KEY: undefined,
  PUBNUB_PUBLISH_KEY: undefined,
  PUBNUB_SECRET_KEY: undefined,
} as const;

/**
 * Type-safe form of getting env vars, including some defaulted values.
 */
export const env = (name: keyof typeof defaulted): string | undefined => {
  return process.env[name] ?? defaulted[name];
};
