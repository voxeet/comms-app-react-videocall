import AskForShareTooltip from '@components/AskForShareTooltip/AskForShareTooltip';
import BackgroundBlurToggle from '@components/BackgroundBlurToggle';
import Copy from '@components/Copy';
import LeaveConference from '@components/LeaveConference';
import MusicModeModal from '@components/MusicModeModal';
import RecordingModal from '@components/RecordingModal';
import ScreenSharingTakeOverModal from '@components/ScreenSharingTakeOverModal/ScreenSharingTakeOverModal';
import ShareHandOverTooltip from '@components/ShareHandOverTooltip/ShareHandOverTooltip';
import StopLiveStreamingModal from '@components/StopLiveStreamingModal';
import ToggleSettingsDrawerButton from '@components/ToggleSettingsDrawerButton';
import {
  ConferenceName,
  DialogTooltip,
  IconButton,
  LiveStreamButton,
  LocalToggleAudioButton,
  LocalToggleVideoButton,
  RecordButton,
  ScreenShareButton,
  Space,
  useConference,
  useNotifications,
  useParticipants,
  useScreenSharing,
  MusicModeButton,
  useAudioProcessing,
} from '@dolbyio/comms-uikit-react';
import useDrawer from '@hooks/useDrawer';
import { useLiveStreaming } from '@hooks/useLiveStreaming';
import LiveStreamingModal from '@src/components/LiveStreamingModal';
import { SideDrawerContentTypes } from '@src/context/SideDrawerContext';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';

import styles from './Dock.module.scss';

export const Dock = () => {
  const { openDrawer } = useDrawer();
  const { conference } = useConference();
  const { participants } = useParticipants();
  const { showSuccessNotification, showErrorNotification, showNeutralNotification } = useNotifications();
  const intl = useIntl();
  const { setSharingErrors } = useScreenSharing();
  const { streamHandler } = useLiveStreaming();
  const { isMusicModeSupported, isError: musicModeError, removeAudioCaptureError } = useAudioProcessing();

  useEffect(() => {
    if (musicModeError) {
      showErrorNotification('Problem with music mode');
      removeAudioCaptureError?.();
    }
  }, [musicModeError]);

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

  const renderMusicModeModal = (isVisible: boolean, accept: () => void, cancel: () => void) => (
    <MusicModeModal isOpen={isVisible} closeModal={cancel} accept={accept} />
  );

  const renderDataInput = (isVisible: boolean, close: () => void) => (
    <LiveStreamingModal isOpen={isVisible} closeModal={close} />
  );

  const renderStopStreamingModal = (isVisible: boolean, accept: () => void, cancel: () => void) => (
    <StopLiveStreamingModal
      isOpen={isVisible}
      closeModal={cancel}
      accept={() => {
        accept();
        showSuccessNotification(intl.formatMessage({ id: 'liveStreamingEnded' }));
      }}
    />
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
          defaultTooltipText={intl.formatMessage({ id: 'mute' })}
          activeTooltipText={intl.formatMessage({ id: 'unmute' })}
        />
        <Space className={styles.spacer} />
        <LocalToggleVideoButton
          defaultTooltipText={intl.formatMessage({ id: 'cameraOff' })}
          activeTooltipText={intl.formatMessage({ id: 'cameraOn' })}
        />
        <Space className={styles.spacer} />
        <ScreenShareButton
          defaultTooltipText={intl.formatMessage({ id: 'present' })}
          activeTooltipText={intl.formatMessage({ id: 'stopPresenting' })}
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
          defaultTooltipText={intl.formatMessage({ id: 'record' })}
          activeTooltipText={intl.formatMessage({ id: 'stopRecording' })}
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
        {import.meta.env.VITE_MUSIC_MODE === 'true' && isMusicModeSupported && (
          <MusicModeButton
            activeIconColor="white"
            defaultTooltipText={intl.formatMessage({ id: 'musicMode' })}
            renderStartConfirmation={renderMusicModeModal}
            renderStopConfirmation={renderMusicModeModal}
            onStartMusicModeAction={() =>
              showNeutralNotification(intl.formatMessage({ id: 'musicModeActivated' }), {
                icon: 'tune',
                width: 210,
                close: false,
              })
            }
            onRemoteStartMusicModeAction={(participantName: string) =>
              showNeutralNotification(
                intl.formatMessage({ id: 'someoneActivatedMusicMode' }, { participant: participantName }),
                {
                  icon: 'tune',
                  close: false,
                },
              )
            }
          />
        )}
        {import.meta.env.VITE_STREAMING === 'true' && (
          <LiveStreamButton
            stopStreaming={async () => {
              await streamHandler('stop');
            }}
            activeIconColor="white"
            disabledIconColor="grey.300"
            defaultTooltipText={intl.formatMessage({ id: 'goLive' })}
            renderDataInput={renderDataInput}
            renderStopConfirmation={renderStopStreamingModal}
            onError={() => showErrorNotification(intl.formatMessage({ id: 'liveStreamingError' }))}
            onStopLiveStreamingAction={() => showSuccessNotification(intl.formatMessage({ id: 'liveStreamingEnded' }))}
          />
        )}
        <IconButton
          testID="OpenDrawerButton"
          icon="participants"
          backgroundColor="transparent"
          badge={participants.length}
          onClick={() => openDrawer(SideDrawerContentTypes.PARTICIPANTS)}
        />
        <ToggleSettingsDrawerButton />
      </Space>
    </Space>
  );
};
