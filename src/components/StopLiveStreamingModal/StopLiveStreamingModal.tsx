import { Modal } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

import ModalContentBase, { type Buttons } from '../ModalContentBase/ModalContentBase';

type StopLiveStreamingModalProps = {
  testID?: string;
  isOpen: boolean;
  closeModal: () => void;
  accept: () => void;
};

const StopLiveStreamingModal = ({
  testID = 'StopLiveStreamingModal',
  isOpen,
  closeModal,
  accept,
}: StopLiveStreamingModalProps) => {
  const intl = useIntl();

  const buttonsConfig: Buttons = [
    {
      onClick: accept,
      label: intl.formatMessage({
        id: 'stopStreaming',
      }),
    },
    {
      onClick: closeModal,
      label: intl.formatMessage({ id: 'cancel' }),
      variant: 'secondary',
    },
  ];

  return (
    <Modal testID={testID} isVisible={isOpen} close={closeModal} closeButton>
      <ModalContentBase
        buttons={buttonsConfig}
        headline={intl.formatMessage({ id: 'stopStreaming' })}
        description={intl.formatMessage({ id: 'stopStreamingModalDesc' })}
        headerLogo="stream"
      />
    </Modal>
  );
};

export default StopLiveStreamingModal;
