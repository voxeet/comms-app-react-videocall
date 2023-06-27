const defaults = {
  VITE_API_PROXY_URL: '/.netlify/functions/app',
  VITE_ENABLE_UNGATED_FEATURES: undefined,
  VITE_APP_NAME: 'Video Call Sample App',
  VITE_APP_VERSION: '1.0',
  VITE_RTMP_STREAMING: 'true',
  VITE_MUSIC_MODE: 'true',
  VITE_BLUR_OPTION: 'true',
  VITE_CONFERENCE_RECORDING: 'false',
} satisfies Record<string, string | undefined>;
// The type above allows us to define the value type while still being strongly typed
// For example, the type for defaults.VITE_ENABLE_UNGATED_FEATURES is undefined rather
// than string | undefined.

type EnvVar = keyof typeof defaults;

export function ungatedFeaturesEnabled(): boolean {
  const value = env('VITE_ENABLE_UNGATED_FEATURES');

  return value === 'true';
}

/**
 * Type-safe form of getting env vars, including some default values. If the env var
 * has a default value, the type will be narrowed down to `string`. Otherwise, the type
 * is `string | undefined`.
 */
export const env = <T extends EnvVar>(name: T): (typeof defaults)[T] | string => {
  return import.meta.env[name] ?? defaults[name];
};
