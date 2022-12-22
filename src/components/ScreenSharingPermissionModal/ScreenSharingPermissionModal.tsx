import ModalContentBase from '@components/ModalContentBase/ModalContentBase';
import { Modal } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

type ScreenSharingPermissionModalProps = {
  testID?: string;
  isOpen?: boolean;
  closeModal: () => void;
};

const browserName = ((agent) => {
  switch (true) {
    case agent.indexOf('edge') > -1:
      return 'MS Edge';
    case agent.indexOf('edg/') > -1:
      return 'Edge ( chromium based)';
    case agent.indexOf('opr') > -1 && 'opr' in window:
      return 'Opera';
    case agent.indexOf('chrome') > -1 && `chrome` in window:
      return 'Chrome';
    case agent.indexOf('trident') > -1:
      return 'MS IE';
    case agent.indexOf('firefox') > -1:
      return 'Mozilla Firefox';
    case agent.indexOf('safari') > -1:
      return 'Safari';
    default:
      return 'other';
  }
})(window.navigator.userAgent.toLowerCase());

const ScreenSharingPermissionModal = ({
  testID = 'ScreenSharingPermissionModal',
  isOpen,
  closeModal,
}: ScreenSharingPermissionModalProps) => {
  const intl = useIntl();

  return (
    <Modal testID={testID} isVisible={isOpen} close={closeModal} closeButton>
      <ModalContentBase
        headline={intl.formatMessage({ id: 'screenSharingNotPossible' })}
        description={intl.formatMessage({ id: 'screenSharingBlockedDesc' }, { browser: browserName })}
        headerLogo="present"
      />
    </Modal>
  );
};

export default ScreenSharingPermissionModal;
