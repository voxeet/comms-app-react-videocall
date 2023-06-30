import {
  useConference,
  useLogger,
  LogLevel,
  useRecording,
  useScreenSharing,
  useLiveStreaming,
} from '@dolbyio/comms-uikit-react';
import getProxyUrl from '@src/utils/getProxyUrl';
import { useEffect } from 'react';

const useConferenceCleanup = () => {
  const { conference, leaveConference } = useConference();
  const { isLocalUserRecordingOwner, stopRecording } = useRecording();
  const { isLocalUserPresentationOwner, stopScreenShare } = useScreenSharing();
  const { isLiveStreamingModeActive, isLocalUserLiveStreamingOwner, stopLiveStreamingByProxy } = useLiveStreaming();
  const { log } = useLogger();
  useEffect(() => {
    (async () => {
      if (conference) {
        if (isLiveStreamingModeActive && isLocalUserLiveStreamingOwner) {
          stopLiveStreamingByProxy(getProxyUrl());
        }
        if (isLocalUserRecordingOwner) {
          await stopRecording();
        }
        if (isLocalUserPresentationOwner) {
          await stopScreenShare();
        }
        /*
         * while cleaning up the conference with just one participant Conference terminated error can be emitted from sdk
         * hence we need to validate participants length before
         */
        if (conference.participants && conference.participants.size > 1) {
          try {
            await leaveConference();
          } catch (error) {
            log(LogLevel.error, JSON.stringify(error));
          }
        }
      }
    })();
  }, []);
};

export default useConferenceCleanup;
