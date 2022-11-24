import ModalContentBase from '@components/ModalContentBase/ModalContentBase';
import { Modal, useMessage, ScreenShareTakeoverMessages, useScreenSharing } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

type ScreenSharingTakeOverModalProps = {
  testID?: string;
  isOpen: boolean;
  closeModal: () => void;
};

const ScreenSharingTakeOverModal = ({
  testID = 'ScreenSharingTakeOverModal',
  isOpen,
  closeModal,
}: ScreenSharingTakeOverModalProps) => {
  const intl = useIntl();
  const { sendMessage } = useMessage();
  const { setPendingTakeoverRequest } = useScreenSharing();

  const handleAskForPermission = async () => {
    await sendMessage({
      text: ScreenShareTakeoverMessages.REQUEST,
    });
    setPendingTakeoverRequest(true);
    closeModal();
  };

  return (
    <Modal testID={testID} isVisible={isOpen} close={closeModal} closeButton>
      <ModalContentBase
        buttons={[
          { onClick: handleAskForPermission, label: intl.formatMessage({ id: 'askForPermission' }) },
          {
            onClick: closeModal,
            label: intl.formatMessage({ id: 'cancel' }),
            variant: 'secondary',
          },
        ]}
        headline={intl.formatMessage({ id: 'someoneElseIsPresenting' })}
        description={intl.formatMessage({ id: 'screenSharingPermissionDesc' })}
        headerLogo="present"
      />
    </Modal>
  );
};

export default ScreenSharingTakeOverModal;
