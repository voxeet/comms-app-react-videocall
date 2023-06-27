/* eslint-disable no-nested-ternary */
// TODO add error handling that isn't console.log

import ActionBar from '@components/ActionBar';
import AllowAudioModal from '@components/AllowAudioModal';
import { BottomDrawer } from '@components/BottomDrawer';
import Dock from '@components/Dock';
import MobileDock from '@components/MobileDock';
import MobileTopBar from '@components/MobileTopBar';
import OneParticipant from '@components/OneParticipant';
import PendingTakeoverInfoBar from '@components/PendingTakeoverInfoBar';
import ScreenSharingPermissionModal from '@components/ScreenSharingPermissionModal/ScreenSharingPermissionModal';
import {
  Conference as ConferenceComponent,
  InfoBar,
  Layout,
  Overlay,
  ParticipantsGrid,
  RecordingStatus,
  ScreenSharingPresentationBox,
  ShareStatus,
  Space,
  Spinner,
  useAudio,
  useCamera,
  useConference,
  useMicrophone,
  useParticipants,
  useRecording,
  useScreenSharing,
  useSpeaker,
  useTheme,
  useVideo,
  useLiveStreaming,
  Modal,
  useCommsContext,
  isEdgeOrChromeBrowser,
} from '@dolbyio/comms-uikit-react';
import useConferenceCreate from '@hooks/useConferenceCreate';
import { usePageRefresh } from '@hooks/usePageRefresh';
import { Onboarding, OnboardingStep } from '@src/components/Onboarding/Onboarding';
import { SideDrawer } from '@src/components/SideDrawer';
import Backdrop from '@src/components/SideDrawer/Backdrop';
import Text from '@src/components/Text';
import { SideDrawerProvider } from '@src/context/SideDrawerContext';
import useSDKErrorHandler from '@src/hooks/useSDKErrorsHandler';
import { conferenceSteps } from '@src/onboarding/conference';
import { Routes } from '@src/types/routes';
import { env, ungatedFeaturesEnabled } from '@src/utils/env';
import getProxyUrl from '@src/utils/getProxyUrl';
import { getMeetTimestamp } from '@src/utils/misc';
import cx from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import styles from './Conference.module.scss';

const MINUTE = 60 * 1000;
const CONFERENCE_DURATION = (ungatedFeaturesEnabled() ? 15 : 0) * MINUTE;
const DURATION_TO_SHOW_NOTIFICATION = CONFERENCE_DURATION - 2 * MINUTE;

export const Conference = () => {
  const { conference, leaveConference } = useConference();
  const { conferenceStatus } = useCommsContext();
  const { participants } = useParticipants();
  const { meetingName } = useConferenceCreate();
  const { selectCamera, localCamera } = useCamera();
  const { isVideo } = useVideo();
  const { selectMicrophone, localMicrophone } = useMicrophone();
  const { isAudio } = useAudio();
  const { selectSpeaker, localSpeakers } = useSpeaker();
  const intl = useIntl();
  const { isDesktop, isMobile, isMobileSmall, isTablet, isLandscape, isPortrait } = useTheme();
  const mobileScreenShareRef = useRef<HTMLDivElement>(null);
  const actionBarRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const mobileTopRef = useRef<HTMLDivElement>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const {
    status,
    permissionError,
    setSharingErrors,
    isLocalUserPresentationOwner,
    isPendingTakeoverRequest,
    isPresentationModeActive,
    stopScreenShare,
  } = useScreenSharing();
  const { status: recordingStatus, ownerId, isLocalUserRecordingOwner, stopRecording } = useRecording();
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);
  const [showBars, setShowBars] = useState(true);
  const [showTwoMinutesRemaining, setShowTwoMinutesRemaining] = useState(false);
  const T2MessageRef = useRef('This video call will end in two minutes');
  const { isLiveStreamingModeActive, isLocalUserLiveStreamingOwner, stopLiveStreamingByProxy } = useLiveStreaming();
  const navigate = useNavigate();

  const cleanup = useCallback(async () => {
    if (isLiveStreamingModeActive && isLocalUserLiveStreamingOwner) {
      stopLiveStreamingByProxy(getProxyUrl());
    }
    if (isLocalUserRecordingOwner) {
      await stopRecording();
    }
    if (isLocalUserPresentationOwner) {
      await stopScreenShare();
    }
    await leaveConference();
  }, [
    isLiveStreamingModeActive,
    isLocalUserLiveStreamingOwner,
    isLocalUserRecordingOwner,
    isLocalUserPresentationOwner,
    leaveConference,
    stopLiveStreamingByProxy,
    stopRecording,
    stopScreenShare,
  ]);

  useSDKErrorHandler(cleanup, cleanup);
  usePageRefresh(cleanup, [
    isLiveStreamingModeActive,
    isLocalUserLiveStreamingOwner,
    isLocalUserRecordingOwner,
    isLocalUserPresentationOwner,
    leaveConference,
    stopLiveStreamingByProxy,
    stopRecording,
    stopScreenShare,
  ]);

  const filteredSteps = (step: OnboardingStep): boolean => {
    switch (step.target) {
      case 'BackgroundBlurSwitch':
        return env('VITE_BLUR_OPTION') === 'true' && isEdgeOrChromeBrowser === true;
      case 'MusicModeButton':
        return env('VITE_MUSIC_MODE') === 'true' && isEdgeOrChromeBrowser === true;
      case 'LiveStreamButton':
        return env('VITE_RTMP_STREAMING') === 'true';
      default:
        return true;
    }
  };

  useEffect(() => {
    const startTime = getMeetTimestamp(meetingName) ?? 0;
    const timePassed = Date.now() - startTime;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const clearTimer = () => clearTimeout(timer);
    if (timePassed >= CONFERENCE_DURATION) return clearTimer;
    if (timePassed >= DURATION_TO_SHOW_NOTIFICATION) {
      T2MessageRef.current = 'This video call will stop in less than 2 minutes';
      setShowTwoMinutesRemaining(true);
    } else {
      timer = setTimeout(() => {
        setShowTwoMinutesRemaining(true);
      }, DURATION_TO_SHOW_NOTIFICATION - timePassed);
    }
    return clearTimer;
  }, [meetingName]);

  useEffect(() => {
    if (showBars && isMobileSmall && participants.length > 1) {
      setTimeout(() => {
        setShowBars(false);
      }, 4000);
    }
    if (participants.length < 2) {
      setShowBars(true);
    }
  }, [showBars, participants.length, isMobileSmall]);

  useEffect(() => {
    if (conferenceStatus === 'ended') {
      cleanup();
      navigate(`${Routes.ConferenceLeft}${window.location.search}`, { replace: true });
    }
  }, [cleanup, conferenceStatus, navigate]);

  const openBottomDrawer = () => {
    setIsBottomDrawerOpen(true);
  };
  const closeBottomDrawer = () => {
    setIsBottomDrawerOpen(false);
  };

  useEffect(() => {
    document.title = `${document.title} - ${meetingName}`;
    return () => {
      // eslint-disable-next-line prefer-destructuring
      document.title = document.title.split(' - ')[0];
    };
  }, [meetingName]);

  useEffect(() => {
    (async () => {
      if (localCamera && localCamera.deviceId && isVideo) {
        try {
          await selectCamera(localCamera.deviceId);
        } catch (error) {
          // console.error(error);
        }
      }
    })();
  }, [isVideo, localCamera, selectCamera]);

  useEffect(() => {
    (async () => {
      if (localMicrophone && localMicrophone.deviceId && isAudio) {
        try {
          await selectMicrophone(localMicrophone.deviceId);
        } catch (error) {
          // console.error(error);
        }
      }
    })();
  }, [localMicrophone, isAudio, selectMicrophone]);

  useEffect(() => {
    (async () => {
      if (localSpeakers && localSpeakers.deviceId) {
        try {
          await selectSpeaker(localSpeakers.deviceId);
        } catch (error) {
          // console.error(error);
        }
      }
    })();
  }, [localSpeakers, selectSpeaker]);

  const isSmartphone = isMobile || isMobileSmall;

  const isOneParticipant = useMemo(() => {
    return participants.length === 1;
  }, [participants]);

  const isPresentationActive =
    status === ShareStatus.Active || (isLocalUserPresentationOwner && isPresentationModeActive);

  return (
    <SideDrawerProvider>
      <ConferenceComponent id={conference?.id}>
        <Layout testID="ConferenceRoute" className={cx(styles.layoutWrapper)}>
          <Backdrop visible={isBottomDrawerOpen} />
          <Space fh className={styles.container}>
            {isPendingTakeoverRequest && (
              <Space className={styles.pendingTakeoverBar} mt="s">
                <PendingTakeoverInfoBar />
              </Space>
            )}
            {!isDesktop && (
              <div ref={mobileTopRef} className={styles.topBarContainer}>
                <MobileTopBar visible={showBars} />
              </div>
            )}
            <Space mt="s" className={styles.infoBarContainer}>
              {!isLocalUserRecordingOwner && recordingStatus === RecordingStatus.Active && (
                <InfoBar
                  testID="RecordingInfoBar"
                  iconName="record"
                  text={intl.formatMessage(
                    { id: 'startedRecording' },
                    { user: participants.find((part) => part.id === ownerId)?.info.name || '' },
                  )}
                  style={{ padding: '12px' }}
                />
              )}
            </Space>
            {!isDesktop && <ActionBar ref={actionBarRef} />}
            <Space
              className={cx(styles.contentWrapper, {
                [styles.mobile]: isMobileSmall && !isOneParticipant,
                [styles.isPresentationActive]: isPresentationActive,
                [styles.landscape]: isLandscape,
              })}
              style={{
                flexGrow: isTablet ? 1 : 'unset',
                height: isSmartphone
                  ? '100%'
                  : `calc(100% - ${
                      ((isTablet ? mobileScreenShareRef.current?.clientHeight : null) ?? 0) +
                      (dockRef.current?.clientHeight ?? 0) +
                      (mobileTopRef.current?.clientHeight ?? 0)
                    }px)`,
              }}
            >
              {isDesktop && <ActionBar ref={actionBarRef} />}
              <Space
                className={cx(styles.presentationGridWrapper)}
                style={{
                  height:
                    isPresentationActive && isDesktop ? `calc(100% - ${dockRef.current?.clientHeight}px)` : '100%',
                }}
                ph={isSmartphone ? 'xs' : 'm'}
                pt={
                  isDesktop && isPresentationActive
                    ? 's'
                    : isDesktop
                    ? 'm'
                    : isMobileSmall && !isPresentationActive && 'xs'
                }
                pb={isSmartphone && 'xs'}
              >
                {isPresentationActive && (
                  <Space className={styles.presentationWrapper} pb={!isDesktop && !isLandscape && 'xs'}>
                    {!isDesktop && <ActionBar ref={mobileScreenShareRef} mobileShare />}
                    <ScreenSharingPresentationBox
                      fallbackText={intl.formatMessage({ id: 'screenShareDefaultFallbackText' })}
                      fallbackButtonText={intl.formatMessage({ id: 'tryAgain' })}
                      style={{
                        height:
                          (isTablet || isSmartphone) && isPresentationActive
                            ? `calc(100% - ${mobileScreenShareRef.current?.clientHeight}px)`
                            : isDesktop
                            ? '100%'
                            : undefined,
                      }}
                    />
                  </Space>
                )}
                <Space
                  className={cx(styles.gridWrapper, {
                    [styles.oneParticipant]: isOneParticipant,
                    [styles.mobileColumnOneParticipant]:
                      isOneParticipant && ((isSmartphone && !isLandscape) || (!isLandscape && isTablet)),
                  })}
                  pl={isDesktop && isPresentationActive ? 'm' : isTablet && isLandscape && isPresentationActive && 'xs'}
                >
                  <ParticipantsGrid
                    localText={intl.formatMessage({ id: 'you' })}
                    testID="ParticipantsGrid"
                    additionalContainerStyle={
                      isOneParticipant && !isDesktop
                        ? {
                            width: '100%',
                            paddingLeft: isLandscape && !isTablet ? '8px' : 'unset',
                          }
                        : undefined
                    }
                  />
                  {isOneParticipant && <OneParticipant />}
                </Space>
              </Space>
            </Space>
            <div className="dockRef" ref={dockRef}>
              {isDesktop ? <Dock /> : <MobileDock openBottomDrawer={openBottomDrawer} visible={showBars} />}
            </div>
            {!isDesktop && (
              <Space
                fw={!isTablet && isPortrait}
                className={cx(
                  styles.bottomDrawer,
                  env('VITE_RTMP_STREAMING') === 'true' && !isTablet && styles.extended,
                  isBottomDrawerOpen && styles.active,
                  !isTablet && styles.smartphones,
                )}
              >
                <BottomDrawer close={closeBottomDrawer} />
              </Space>
            )}
            <SideDrawer />
          </Space>
          <AllowAudioModal />
          <ScreenSharingPermissionModal isOpen={!!permissionError} closeModal={() => setSharingErrors()} />
        </Layout>
      </ConferenceComponent>
      {ungatedFeaturesEnabled() && (
        <Modal
          testID="LeaveEventModel"
          isVisible={showTwoMinutesRemaining}
          close={() => setShowTwoMinutesRemaining(false)}
          closeButton
          overlayClickClose
        >
          <Space m="l" css={{ display: 'flex', flexDirection: 'column' }}>
            <Text testID="LeaveEventModelDescription" type="h6" align="center">
              Warning
            </Text>
            <Text testID="LeaveEventModelDescription" align="center">
              {T2MessageRef.current}
            </Text>
          </Space>
        </Modal>
      )}
      {isMobileSmall && !showBars && (
        <div
          className={cx(styles.actionDetector)}
          onTouchStartCapture={() => {
            setShowBars(true);
          }}
        />
      )}
      <Overlay
        visible={status === ShareStatus.Loading || recordingStatus === RecordingStatus.Loading}
        opacity={0.8}
        color="black"
      >
        <Spinner
          textContent={
            status === ShareStatus.Loading
              ? intl.formatMessage({ id: 'preparingScreenSharing' })
              : intl.formatMessage({ id: 'preparingRecording' })
          }
        />
      </Overlay>
      {!isMobile && showOnboarding && (
        <Onboarding
          name="conference"
          steps={conferenceSteps.filter((step) => filteredSteps(step))}
          onComplete={() => setShowOnboarding(false)}
        />
      )}
    </SideDrawerProvider>
  );
};
