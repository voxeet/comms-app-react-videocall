import {
  useConference,
  useLiveStreaming as useLiveStreamingBase,
  type LiveStreamProvider,
} from '@dolbyio/comms-uikit-react';
import fetch from '@src/utils/fetch';
import { determineProvider } from '@src/utils/misc';

export const useLiveStreaming = () => {
  const { startLiveStreaming, stopLiveStreaming, ...base } = useLiveStreamingBase();
  const { conference } = useConference();

  const streamHandler = async (variant: 'start' | 'stop', rtmp?: string) => {
    const { VITE_PROXY_PROTOCOL, VITE_API_PROXY, VITE_PROXY_PORT } = import.meta.env;
    const params = {
      method: 'POST',
      data: {
        conferenceId: conference?.id,
        rtmp,
      },
    } as const;

    const url = `${VITE_PROXY_PROTOCOL}://${VITE_API_PROXY}${
      VITE_PROXY_PORT ? `:${VITE_PROXY_PORT}` : ''
    }/streaming/${variant}`;
    const request = async () => {
      await fetch(url, params);
    };
    if (variant === 'start' && rtmp) {
      const provider = determineProvider(rtmp) as LiveStreamProvider;
      return startLiveStreaming(request, rtmp, provider);
    }
    return stopLiveStreaming(request);
  };
  return { ...base, streamHandler };
};
