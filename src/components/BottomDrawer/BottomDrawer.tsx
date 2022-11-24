import LiveStreamingModal from '@components/LiveStreamingModal';
import RecordingModal from '@components/RecordingModal';
import StopLiveStreamingModal from '@components/StopLiveStreamingModal';
import Text from '@components/Text';
import ToggleSettingsDrawerButton from '@components/ToggleSettingsDrawerButton';
import { SideDrawerContentTypes } from '@context/SideDrawerContext';
import {
  CopyConferenceLinkButton,
  IconButton,
  LiveStreamButton,
  RecordButton,
  Space,
  useNotifications,
  useParticipants,
  useTheme,
} from '@dolbyio/comms-uikit-react';
import useDrawer from '@hooks/useDrawer';
import { useLiveStreaming } from '@hooks/useLiveStreaming';
import cx from 'classnames';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import styles from './BottomDrawer.module.scss';

const isLiveStreamingAvailable = import.meta.env.VITE_STREAMING === 'true';

type BottomDrawerProps = {
  close: () => void;
};

const BottomDrawer = ({ close }: BottomDrawerProps) => {
  const { isTablet, isMobileSmall, isMobile } = useTheme();
  const { streamHandler } = useLiveStreaming();
  const { participants } = useParticipants();
  const { openDrawer } = useDrawer();
  const { showSuccessNotification, showErrorNotification } = useNotifications();
  const intl = useIntl();

  const openParticipantsList = () => {
    openDrawer(SideDrawerContentTypes.PARTICIPANTS);
    close();
  };

  const renderRecordModal = (isVisible: boolean, accept: () => void, cancel: () => void) => (
    <RecordingModal isOpen={isVisible} closeModal={cancel} accept={accept} />
  );

  const renderDataInput = (isVisible: boolean, closeModal: () => void) => (
    <LiveStreamingModal isOpen={isVisible} closeModal={closeModal} onActionSuccess={close} />
  );

  const renderStopStreamingModal = (isVisible: boolean, accept: () => void, cancel: () => void) => (
    <StopLiveStreamingModal isOpen={isVisible} closeModal={cancel} accept={accept} />
  );

  const recordingSuccessAction = useCallback((message?: string) => {
    close();
    if (message) {
      showSuccessNotification(message);
    }
  }, []);

  const areThreeButtonsInRow = (isTablet || isMobile) && !isLiveStreamingAvailable;

  return (
    <Space fw className={cx(styles.drawer, import.meta.env.VITE_STREAMING === 'true' && !isTablet && styles.extended)}>
      <Space className={styles.closeButtonSection}>
        <IconButton size="s" icon="close" onClick={close} backgroundColor="transparent" />
      </Space>
      <Space mb="m" className={cx(styles.buttonsSection, areThreeButtonsInRow && styles.center)}>
        <Space className={styles.buttonContainer}>
          <CopyConferenceLinkButton
            url={window.location.href}
            size="m"
            testID="ShareLinkButton"
            icon="invite"
            backgroundColor="grey.600"
          />
          <Text type="captionSmallDemiBold" id="inviteLabel" />
        </Space>
        {areThreeButtonsInRow && <Space className={styles.spacer} />}
        {isMobileSmall && (
          <Space className={styles.buttonContainer}>
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
        <Space className={styles.buttonContainer}>
          <RecordButton
            defaultTooltipText={intl.formatMessage({ id: 'record' })}
            activeTooltipText={intl.formatMessage({ id: 'stopRecording' })}
            onStopRecordingAction={() => recordingSuccessAction(intl.formatMessage({ id: 'recordingStopped' }))}
            onStartRecordingAction={recordingSuccessAction}
            renderStartConfirmation={renderRecordModal}
            renderStopConfirmation={renderRecordModal}
          />
          <Text type="captionSmallDemiBold" id="recordingLabel" />
        </Space>
        {areThreeButtonsInRow && <Space className={styles.spacer} />}
        {isLiveStreamingAvailable && (
          <Space className={styles.buttonContainer}>
            <LiveStreamButton
              transparent={false}
              onError={() => showErrorNotification(intl.formatMessage({ id: 'liveStreamingError' }))}
              renderDataInput={renderDataInput}
              renderStopConfirmation={renderStopStreamingModal}
              stopStreaming={async () => {
                await streamHandler('stop');
                close();
              }}
              onStopLiveStreamingAction={() =>
                showSuccessNotification(intl.formatMessage({ id: 'liveStreamingEnded' }))
              }
            />
            <Text type="captionSmallDemiBold" id="goLive" />
          </Space>
        )}
        <Space className={styles.buttonContainer}>
          <ToggleSettingsDrawerButton backgroundColor="grey.600" onOpenAction={close} />
          <Text type="captionSmallDemiBold" id="settings" />
        </Space>
      </Space>
    </Space>
  );
};

export default BottomDrawer;
