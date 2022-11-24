import { Modal } from '@dolbyio/comms-uikit-react';
import React, { useMemo } from 'react';
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

  const buttonsConfig = useMemo(
    () => [
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
    ],
    [],
  ) as Buttons;

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
