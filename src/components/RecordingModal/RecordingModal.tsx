import ModalContentBase, { type Buttons } from '@components/ModalContentBase/ModalContentBase';
import { Modal, useRecording } from '@dolbyio/comms-uikit-react';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

type RecordingModalProps = {
  testID?: string;
  isOpen: boolean;
  closeModal: () => void;
  accept: () => void;
};

const RecordingModal = ({ testID = 'RecordingModal', isOpen, closeModal, accept }: RecordingModalProps) => {
  const intl = useIntl();
  const { isRecordingModeActive } = useRecording();

  const buttonsConfig = useMemo(
    () => [
      {
        onClick: accept,
        label: intl.formatMessage({
          id: isRecordingModeActive ? 'stopRecording' : 'startRecording',
        }),
      },
      {
        onClick: closeModal,
        label: intl.formatMessage({ id: 'cancel' }),
        variant: 'secondary',
      },
    ],
    [isRecordingModeActive],
  ) as Buttons;

  return (
    <Modal testID={testID} isVisible={isOpen} close={closeModal} closeButton>
      <ModalContentBase
        buttons={buttonsConfig}
        headline={intl.formatMessage({ id: isRecordingModeActive ? 'stopRecording' : 'recordModalHeadline' })}
        description={intl.formatMessage({ id: 'recordModalDesc' })}
        headerLogo="record"
      />
    </Modal>
  );
};

export default RecordingModal;
