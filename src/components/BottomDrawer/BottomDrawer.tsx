import {
  Space,
  IconButton,
  useTheme,
  useParticipants,
  CopyConferenceLinkButton,
  RecordButton,
  useNotifications,
} from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import useDrawer from '../../hooks/useDrawer';
import RecordingModal from '../RecordingModal';
import Text from '../Text';

import styles from './BottomDrawer.module.scss';

type BottomDrawerProps = {
  close: () => void;
};

const BottomDrawer = ({ close }: BottomDrawerProps) => {
  const { isTablet, isPortrait, isMobileSmall } = useTheme();
  const { participants } = useParticipants();
  const { openDrawer } = useDrawer();
  const { showSuccessNotification } = useNotifications();
  const intl = useIntl();

  const openParticipantsList = () => {
    openDrawer();
    close();
  };

  const renderRecordModal = (isVisible: boolean, accept: () => void, cancel: () => void) => (
    <RecordingModal isOpen={isVisible} closeModal={cancel} accept={accept} />
  );

  const recordingSuccessAction = useCallback((message?: string) => {
    close();
    if (message) {
      showSuccessNotification(message);
    }
  }, []);

  return (
    <Space className={cx(styles.drawer, !isTablet && isPortrait && styles.smartphones)}>
      <Space className={styles.close}>
        <IconButton size="s" icon="close" onClick={close} backgroundColor="transparent" />
      </Space>
      <Space mr={!isTablet ? 's' : undefined} mt="xxxl" className={styles.buttonContainer}>
        <CopyConferenceLinkButton
          url={window.location.href}
          size="m"
          testID="ShareLinkButton"
          icon="invite"
          backgroundColor="grey.600"
        />
        <Text type="captionSmallDemiBold" id="inviteLabel" />
      </Space>
      {isMobileSmall && (
        <Space mt="xxxl" className={styles.buttonContainer}>
          <IconButton
            testID="OpenDrawerButton"
            icon="participants"
            badge={participants.length}
            onClick={openParticipantsList}
            rightBadge
            backgroundColor="grey.600"
            badgeColor="grey.300"
          />
          <Text type="captionSmallDemiBold" id="participantsLabel" />
        </Space>
      )}
      <Space ml={!isTablet ? 's' : undefined} mt="xxxl" className={styles.buttonContainer}>
        <RecordButton
          activeTooltipText={intl.formatMessage({ id: 'record' })}
          inactiveTooltipText={intl.formatMessage({ id: 'stopRecording' })}
          onStopRecordingAction={() => recordingSuccessAction(intl.formatMessage({ id: 'recordingStopped' }))}
          onStartRecordingAction={recordingSuccessAction}
          renderStartConfirmation={renderRecordModal}
          renderStopConfirmation={renderRecordModal}
        />
        <Text type="captionSmallDemiBold" id="recordingLabel" />
      </Space>
    </Space>
  );
};

export default BottomDrawer;
