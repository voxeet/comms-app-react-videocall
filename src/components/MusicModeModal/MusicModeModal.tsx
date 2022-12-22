import ModalContentBase, { type Buttons } from '@components/ModalContentBase/ModalContentBase';
import { Modal, useAudioProcessing } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

type MusicModeModalProps = {
  testID?: string;
  isOpen: boolean;
  closeModal: () => void;
  accept: () => void;
};

const MusicModeModal = ({ testID = 'MusicModeModal', isOpen, closeModal, accept }: MusicModeModalProps) => {
  const intl = useIntl();
  const { isMusicMode } = useAudioProcessing();

  const buttonsConfig: Buttons = [
    {
      onClick: accept,
      label: intl.formatMessage({
        id: isMusicMode ? 'turnOff' : 'activate',
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
        headline={intl.formatMessage({
          id: isMusicMode ? 'turnOffMusicMode' : 'musicMode',
        })}
        description={intl.formatMessage({
          id: isMusicMode ? 'musicModeStopModalDesc' : 'musicModeStartModalDesc',
        })}
        headerLogo="tune"
      />
    </Modal>
  );
};

export default MusicModeModal;
