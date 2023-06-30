import { ErrorCodes, useErrors, useNotifications, useSession } from '@dolbyio/comms-uikit-react';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

const useSDKErrorHandler = (
  sessionCallback?: () => Promise<void> | void,
  cleanupCallback?: () => Promise<void> | void,
) => {
  const { participant, closeSession, isSessionOpened, openSession } = useSession();
  const { showWarningNotification, showErrorNotification } = useNotifications();

  const { sdkErrors, removeSdkErrors } = useErrors();
  const intl = useIntl();

  useEffect(() => {
    if (ErrorCodes.IncorrectSession in sdkErrors) {
      showErrorNotification(intl.formatMessage({ id: 'sessionExpired' }));
      removeSdkErrors(ErrorCodes.IncorrectSession);
      setTimeout(async () => {
        if (participant && isSessionOpened()) {
          await sessionCallback?.();
          const { name } = participant.info;
          await closeSession();
          await openSession({ name });
        }
      }, 100);
    }
    if (ErrorCodes.PeerConnectionDisconnectedError in sdkErrors) {
      showWarningNotification(intl.formatMessage({ id: 'connectionError' }));
      removeSdkErrors(ErrorCodes.PeerConnectionDisconnectedError);
    }
    if (ErrorCodes.ExpiredOrInvalidToken in sdkErrors) {
      showErrorNotification(intl.formatMessage({ id: 'invalidToken' }));
      cleanupCallback?.();
    }
  }, [sdkErrors]);
};

export default useSDKErrorHandler;
