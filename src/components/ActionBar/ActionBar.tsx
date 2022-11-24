/* eslint-disable no-nested-ternary */
import { FacebookLive, Twitch, YouTubeStudio } from '@assets/index';
import LiveStreamingModal from '@components/LiveStreamingModal';
import StopLiveStreamingModal from '@components/StopLiveStreamingModal';
import Text from '@components/Text';
import Timer from '@components/Timer';
import {
  GenericStatus,
  LiveStreamingActionBar,
  RecordingActionBar,
  ScreenSharingActionBar,
  Space,
  useNotifications,
  useRecording,
  useScreenSharing,
  useTheme,
} from '@dolbyio/comms-uikit-react';
import { useLiveStreaming } from '@hooks/useLiveStreaming';
import React, { forwardRef, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

type ActionBarProps = {
  mobileShare?: boolean;
};

const providers = {
  twitch: <Twitch />,
  youtube: <YouTubeStudio />,
  facebook: <FacebookLive />,
  other: null,
};

function isActive(...args: GenericStatus[]) {
  return args.every((arg) => arg === GenericStatus.Active);
}

function isSomeActive(...args: GenericStatus[]) {
  return args.some((arg) => arg === GenericStatus.Active);
}

export const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(({ mobileShare }, ref) => {
  const { isDesktop, isMobile, isMobileSmall, isTablet } = useTheme();
  const intl = useIntl();
  const [activeBar, setActiveBar] = useState<'presenting' | 'recording' | 'streaming'>('presenting');
  const { showSuccessNotification } = useNotifications();
  const { owner, isPresentationModeActive, status: sharingStatus, isLocalUserPresentationOwner } = useScreenSharing();
  const {
    isLocalUserRecordingOwner,
    isRecordingModeActive,
    status: recordingStatus,
    timestamp: recordingTimestamp,
  } = useRecording();
  const {
    owner: liveStreamingOwner,
    provider,
    status: streamingStatus,
    timestamp,
    isLiveStreamingModeActive,
    streamHandler,
    isLocalUserLiveStreamingOwner,
  } = useLiveStreaming();
  const [isStreamingModal, setStreamingModal] = useState(false);

  const serviceProviderLogo = useMemo(() => {
    return (
      <Space mr="xs" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        {providers[provider as keyof typeof providers]}
      </Space>
    );
  }, [provider]);

  const showStreamingModal = () => setStreamingModal(true);
  const hideStreamingModal = () => setStreamingModal(false);

  const liveStreamingHandler = useMemo(
    () => ({
      start: showStreamingModal,
      stop: showStreamingModal,
    }),
    [],
  );

  const streamingLabel = useMemo(() => {
    if (!isActive(streamingStatus)) {
      return null;
    }
    return (
      <>
        <Timer startTime={timestamp ?? undefined} />
        {!((isMobileSmall && isRecordingModeActive) || isActive(recordingStatus)) && (
          <>
            <Text> | </Text>
            <Text
              id={isLocalUserLiveStreamingOwner ? 'streaming' : 'isStreaming'}
              values={{ participant: liveStreamingOwner?.info.name }}
            />
          </>
        )}
      </>
    );
  }, [streamingStatus, isLocalUserLiveStreamingOwner, timestamp, recordingStatus, isRecordingModeActive]);

  const streamingModal = useMemo(() => {
    if (!isStreamingModal) {
      return null;
    }
    if (isActive(streamingStatus)) {
      return (
        <StopLiveStreamingModal
          isOpen={isStreamingModal}
          closeModal={hideStreamingModal}
          accept={async () => {
            hideStreamingModal();
            await streamHandler('stop');
            showSuccessNotification(intl.formatMessage({ id: 'liveStreamingEnded' }));
          }}
        />
      );
    }
    return <LiveStreamingModal closeModal={hideStreamingModal} isOpen={isStreamingModal} />;
  }, [streamingStatus, isStreamingModal]);

  if (
    !isLocalUserPresentationOwner &&
    !isLocalUserRecordingOwner &&
    !isLocalUserLiveStreamingOwner &&
    !isSomeActive(sharingStatus, recordingStatus, streamingStatus)
  ) {
    return null;
  }

  return (
    <div className="actionBarRef" ref={ref}>
      <Space
        ph={isDesktop ? 'm' : !mobileShare && (isTablet ? 'm' : 'xs')}
        pt={isMobile || isMobileSmall ? 'xs' : isDesktop && 'm'}
        pb={!isDesktop && !isMobileSmall && !mobileShare && 'xs'}
        style={{ display: 'flex' }}
      >
        {(isLocalUserRecordingOwner || isActive(recordingStatus)) && !mobileShare && (
          <RecordingActionBar
            onMount={() => setActiveBar('recording')}
            onClick={() => setActiveBar('recording')}
            compact={
              activeBar !== 'recording' && (isPresentationModeActive || isSomeActive(streamingStatus, sharingStatus))
            }
            statusLabels={{
              active: (
                <>
                  <Timer startTime={recordingTimestamp ?? undefined} />
                  {!(isMobileSmall && (isLiveStreamingModeActive || isActive(streamingStatus))) && (
                    <>
                      <Text> | </Text>
                      <Text id="recording" />
                    </>
                  )}
                </>
              ),
              error: intl.formatMessage({ id: 'recordingFailed' }),
              loading: `${intl.formatMessage({ id: 'recording' })}...`,
              other: '',
            }}
            buttonLabels={{
              active: {
                tooltip: intl.formatMessage({ id: 'stopRecording' }),
                label: intl.formatMessage({ id: !isDesktop ? 'stop' : 'stopRecording' }),
              },
              error: {
                tooltip: intl.formatMessage({ id: 'tryAgain' }),
                label: intl.formatMessage({ id: 'tryAgain' }),
              },
            }}
            onActionSuccess={() => {
              if (isActive(recordingStatus)) {
                showSuccessNotification(intl.formatMessage({ id: 'recordingStopped' }));
              }
              if (isActive(recordingStatus)) {
                showSuccessNotification(intl.formatMessage({ id: 'recordingSuccessfully' }));
              }
            }}
          />
        )}
        {(isLiveStreamingModeActive || isActive(streamingStatus)) && !mobileShare && (
          <>
            <LiveStreamingActionBar
              ml={isActive(recordingStatus) || isRecordingModeActive ? 'xs' : undefined}
              onMount={() => setActiveBar('streaming')}
              actions={liveStreamingHandler}
              streamingServiceLogo={serviceProviderLogo}
              onClick={() => setActiveBar('streaming')}
              compact={(isActive(sharingStatus) || isActive(recordingStatus)) && activeBar !== 'streaming'}
              statusLabels={{
                active: streamingLabel,
                error: intl.formatMessage({ id: 'streamingFailed' }),
                loading: `${intl.formatMessage({ id: 'streaming' })}...`,
                other: '',
              }}
              buttonLabels={{
                active: {
                  label: intl.formatMessage({ id: !isDesktop ? 'stop' : 'stopStreaming' }),
                },
                error: {
                  label: intl.formatMessage({ id: 'tryAgain' }),
                },
              }}
              guestLabel={streamingLabel}
            />
            {isStreamingModal && streamingModal}
          </>
        )}
        {(isDesktop || mobileShare) && (isPresentationModeActive || isActive(sharingStatus)) && (
          <ScreenSharingActionBar
            ml={
              (isLocalUserRecordingOwner ||
                isActive(recordingStatus) ||
                isLiveStreamingModeActive ||
                isActive(streamingStatus)) &&
              !mobileShare
                ? 'xs'
                : undefined
            }
            onMount={() => setActiveBar('presenting')}
            onClick={() => setActiveBar('presenting')}
            compact={
              activeBar !== 'presenting' &&
              (isRecordingModeActive || isLiveStreamingModeActive || isSomeActive(streamingStatus, recordingStatus))
            }
            statusLabels={{
              active: intl.formatMessage({ id: 'screenSharing' }),
              error: intl.formatMessage({ id: 'screenSharingIssue' }),
              loading: `${intl.formatMessage({ id: 'screenSharing' })}...`,
              other: '',
            }}
            buttonLabels={{
              label: intl.formatMessage({ id: 'stopPresenting' }),
            }}
            onActionSuccess={() => {
              showSuccessNotification(intl.formatMessage({ id: 'screenSharingStopped' }));
            }}
            guestLabel={intl.formatMessage({ id: 'isPresenting' }, { participant: owner?.info.name })}
          />
        )}
      </Space>
    </div>
  );
});
