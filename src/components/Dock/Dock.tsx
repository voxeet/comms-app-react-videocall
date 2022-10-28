import {
  useConference,
  useNotifications,
  useParticipants,
  IconButton,
  Space,
  LocalToggleAudioButton,
  LocalToggleVideoButton,
  ConferenceName,
  ScreenShareButton,
  DialogTooltip,
  useScreenSharing,
  RecordButton,
} from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

import useDrawer from '../../hooks/useDrawer';
import AskForShareTooltip from '../AskForShareTooltip/AskForShareTooltip';
import BackgroundBlurToggle from '../BackgroundBlurToggle';
import Copy from '../Copy';
import LeaveConference from '../LeaveConference';
import RecordingModal from '../RecordingModal';
import ScreenSharingTakeOverModal from '../ScreenSharingTakeOverModal/ScreenSharingTakeOverModal';
import ShareHandOverTooltip from '../ShareHandOverTooltip/ShareHandOverTooltip';

import styles from './Dock.module.scss';

export const Dock = () => {
  const { openDrawer } = useDrawer();
  const { conference } = useConference();
  const { participants } = useParticipants();
  const { showSuccessNotification, showErrorNotification } = useNotifications();
  const intl = useIntl();
  const { setSharingErrors } = useScreenSharing();

  if (conference === null) {
    return null;
  }

  const isChrome = navigator.userAgent.match(/chrome|chromium|crios/i);

  const handleLackOfBrowserPermissions = () => {
    if (!isChrome) {
      showErrorNotification(intl.formatMessage({ id: 'lackOfPermissions' }));
      setSharingErrors();
    } else {
      setSharingErrors();
    }
  };

  const renderTakeOver = (isOpen: boolean, close: () => void) => (
    <ScreenSharingTakeOverModal isOpen={isOpen} closeModal={close} />
  );

  const renderHandOver = (isVisible: boolean, accept: () => void, cancel: () => void, requester?: string) => (
    <DialogTooltip isVisible={isVisible}>
      <ShareHandOverTooltip accept={accept} cancel={cancel} requester={requester} />
    </DialogTooltip>
  );
  const renderAskForShare = (isVisible: boolean, accept: () => void, cancel: () => void) => (
    <DialogTooltip isVisible={isVisible}>
      <AskForShareTooltip accept={accept} cancel={cancel} />
    </DialogTooltip>
  );
  const renderRecordModal = (isVisible: boolean, accept: () => void, cancel: () => void) => (
    <RecordingModal isOpen={isVisible} closeModal={cancel} accept={accept} />
  );

  return (
    <Space testID="Dock" className={styles.dock} p="m">
      <Space className={styles.row} style={{ width: 330 }}>
        <Copy />
        <Space style={{ flex: 1 }}>
          <ConferenceName testID="ConferenceName" />
        </Space>
      </Space>
      <Space className={styles.row}>
        <LocalToggleAudioButton
          activeTooltipText={intl.formatMessage({ id: 'mute' })}
          inactiveTooltipText={intl.formatMessage({ id: 'unmute' })}
        />
        <Space className={styles.spacer} />
        <LocalToggleVideoButton
          activeTooltipText={intl.formatMessage({ id: 'cameraOff' })}
          inactiveTooltipText={intl.formatMessage({ id: 'cameraOn' })}
        />
        <Space className={styles.spacer} />
        <ScreenShareButton
          activeTooltipText={intl.formatMessage({ id: 'present' })}
          inactiveTooltipText={intl.formatMessage({ id: 'stopPresenting' })}
          onStartSharingAction={() => showSuccessNotification(intl.formatMessage({ id: 'presentingSuccessfully' }))}
          onStopSharingAction={() => showSuccessNotification(intl.formatMessage({ id: 'screenSharingStopped' }))}
          onTakeOverDeclineAction={() => showErrorNotification(intl.formatMessage({ id: 'requestDeclined' }))}
          onLackOfBrowserPermissions={handleLackOfBrowserPermissions}
          renderTakeOver={renderTakeOver}
          renderHandOver={renderHandOver}
          renderAskForShare={renderAskForShare}
        />
        <Space className={styles.spacer} />
        <RecordButton
          activeTooltipText={intl.formatMessage({ id: 'record' })}
          inactiveTooltipText={intl.formatMessage({ id: 'stopRecording' })}
          onStopRecordingAction={() => showSuccessNotification(intl.formatMessage({ id: 'recordingStopped' }))}
          onError={() => showErrorNotification(intl.formatMessage({ id: 'recordingError' }))}
          renderStartConfirmation={renderRecordModal}
          renderStopConfirmation={renderRecordModal}
        />
        <Space className={styles.spacer} />
        <LeaveConference />
      </Space>
      <Space className={styles.row} style={{ width: 330, justifyContent: 'flex-end' }}>
        <BackgroundBlurToggle />
        <IconButton
          testID="OpenDrawerButton"
          icon="participants"
          backgroundColor="transparent"
          badge={participants.length}
          onClick={openDrawer}
        />
      </Space>
    </Space>
  );
};
