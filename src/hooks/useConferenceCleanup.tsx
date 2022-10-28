import { useConference } from '@dolbyio/comms-uikit-react';
import { useEffect } from 'react';

const useConferenceCleanup = () => {
  const { conference, leaveConference } = useConference();
  useEffect(() => {
    (async () => {
      if (conference) {
        try {
          await leaveConference();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn(error);
        }
      }
    })();
  }, []);
};

export default useConferenceCleanup;
