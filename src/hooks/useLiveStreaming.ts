import {
  useConference,
  useLiveStreaming as useLiveStreamingBase,
  type LiveStreamProvider,
} from '@dolbyio/comms-uikit-react';
import fetch from '@src/utils/fetch';
import getProxyUrl from '@src/utils/getProxyUrl';
import { determineProvider } from '@src/utils/misc';

export const useLiveStreaming = () => {
  const { startLiveStreaming, stopLiveStreaming, ...base } = useLiveStreamingBase();
  const { conference } = useConference();

  const streamHandler = async (variant: 'start' | 'stop', rtmp?: string) => {
    const params = {
      method: 'POST',
      data: {
        conferenceId: conference?.id,
        rtmp,
      },
    } as const;

    const url = `${getProxyUrl()}/streaming/${variant}`;
    const request = async () => {
      await fetch(url, params);
    };
    if (variant === 'start' && rtmp) {
      const provider = determineProvider(rtmp) as LiveStreamProvider;
      return startLiveStreaming(request, rtmp, provider);
    }
    return stopLiveStreaming(request);
  };
  /*
   * While refreshing the page with the live stream active we need to inform backend about this by sending beacon,
   * since regular http requests with app/json content type won't work
   */
  const sendStreamingBeacon = () => {
    if (base.isLiveStreamingModeActive) {
      navigator.sendBeacon(`${getProxyUrl()}/streaming/stop/?conferenceId=${conference?.id}`);
    }
  };
  return { ...base, streamHandler, sendStreamingBeacon };
};
