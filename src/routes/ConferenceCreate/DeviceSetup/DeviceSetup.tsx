import Text from '@components/Text';
import {
  BlockedAudioStateType,
  InfoBar,
  JoinConferenceButton,
  Overlay,
  Space,
  Spinner,
  useAudio,
  useCamera,
  useErrors,
  useMicrophone,
  useNotifications,
  useSession,
  useSpeaker,
  useTheme,
  useVideo,
  VideoLocalView,
} from '@dolbyio/comms-uikit-react';
import useConferenceCreate from '@hooks/useConferenceCreate';
import { Onboarding } from '@src/components/Onboarding/Onboarding';
import { SideDrawer } from '@src/components/SideDrawer';
import { hostDeviceSetupSteps } from '@src/onboarding/host_device_setup';
import MobileContent from '@src/routes/ConferenceCreate/DeviceSetup/MobileContent';
import ToggleMicrophoneButton from '@src/routes/ConferenceCreate/DeviceSetup/ToggleMicrophoneButton';
import ToggleVideoButton from '@src/routes/ConferenceCreate/DeviceSetup/ToggleVideoButton';
import { CreateStep, Routes } from '@src/types/routes';
import { getMeetTimestamp, splitMeetingAlias } from '@src/utils/misc';
import React, { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import setJoinOptions, { JoinParams } from '../../../utils/setJoinOptions';

import styles from './DeviceSetup.module.scss';

export const DeviceSetup = () => {
  const navigate = useNavigate();
  const { getDefaultLocalCamera, getCameraPermission, localCamera, setLocalCamera, videoError, removeError } =
    useCamera();
  const { getMicrophonePermission, localMicrophone } = useMicrophone();
  const { localSpeakers } = useSpeaker();
  const { isVideo } = useVideo();
  const { isAudio, blockedAudioState, markBlockedAudioActivated } = useAudio();
  const { meetingName, username, setStep, setMeetingName } = useConferenceCreate();
  const { isTablet, isMobile, isMobileSmall } = useTheme();

  const [isAllPermission, setIsAllPermission] = useState<boolean>(false);
  const [isCameraPermission, setIsCameraPermission] = useState<boolean>(false);
  const [isMicrophonePermission, setIsMicrophonePermission] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const intl = useIntl();
  const { openSession, participant, closeSession, isSessionOpened } = useSession();
  const { showErrorNotification } = useNotifications();
  const { sdkErrors } = useErrors();
  const [showOnboarding, setShowOnboarding] = useState(true);

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const uniqueMeetingName = getMeetTimestamp(meetingName) ? meetingName : `${meetingName}|${Date.now().toString()}`;

  useEffect(() => {
    if (sdkErrors['Incorrect participant session']) {
      setIsLoading(false);
    }
    checkPermissions();
    sessionSetup();
    // This hook should only be run once on first component render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (videoError) {
      showErrorNotification(intl.formatMessage({ id: 'videoRetrying' }));
      removeError();
    }
  }, [intl, removeError, showErrorNotification, videoError]);

  const checkPermissions = () => {
    (async () => {
      try {
        const hasCameraAccess = await getCameraPermission();
        const hasMicrophoneAccess = await getMicrophonePermission();
        const hasAllPermissions = hasCameraAccess && hasMicrophoneAccess;
        setIsCameraPermission(hasCameraAccess);
        setIsMicrophonePermission(hasMicrophoneAccess);
        setIsAllPermission(hasAllPermissions);
      } catch {
        setIsAllPermission(false);
      }
    })();
  };

  const sessionSetup = async () => {
    if (!isSessionOpened()) {
      return openSession({
        name: username,
      });
    }
    if (participant?.info.name !== username) {
      await closeSession();
      return openSession({
        name: username,
      });
    }
    return true;
  };

  useEffect(() => {
    if (isCameraPermission && localCamera === null) {
      (async () => {
        setLocalCamera(await getDefaultLocalCamera());
      })();
    }
  }, [localCamera, isCameraPermission]);

  const allPermissionsOff = !isMicrophonePermission && !isCameraPermission;
  const allMediaOff = !isAudio && !isVideo;

  const willAudioBeBlocked = allPermissionsOff || allMediaOff;

  const onInitialise = async () => {
    if (blockedAudioState === BlockedAudioStateType.INACTIVATED && isSafari && willAudioBeBlocked) {
      markBlockedAudioActivated();
    }
    setIsLoading(true);
  };

  const onSuccess = async () => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get('id')) {
      params.append('id', uniqueMeetingName);
      setMeetingName(uniqueMeetingName);
    } else {
      params.set('id', meetingName);
    }
    navigate(`${Routes.Conference}?${params.toString()}`);
    setStep(CreateStep.meetingName);
  };

  const onJoinError = async () => {
    showErrorNotification(intl.formatMessage({ id: 'joinErrorNotification' }));
    setIsLoading(false);
  };

  const joinOptions = useMemo(() => {
    const joinParams: JoinParams = {
      isMicrophonePermission,
      isCameraPermission,
      isAudio,
      isVideo,
    };

    return setJoinOptions(joinParams);
  }, [isAudio, isCameraPermission, isMicrophonePermission, isVideo]);

  if (isLoading) {
    return (
      <Overlay opacity={1}>
        <Spinner textContent={intl.formatMessage({ id: 'joiningMeeting' })} />
      </Overlay>
    );
  }

  if (isTablet || isMobile || isMobileSmall) {
    return (
      <MobileContent
        localMicrophone={localMicrophone}
        localCamera={localCamera}
        localSpeakers={localSpeakers}
        username={username}
        meetingName={uniqueMeetingName}
        isMicrophonePermission={isMicrophonePermission}
        isCameraPermission={isCameraPermission}
        isAllPermission={isAllPermission}
        onInitialise={onInitialise}
        onSuccess={onSuccess}
        joinOptions={joinOptions}
        onError={onJoinError}
      />
    );
  }

  return (
    <Space className={styles.container}>
      <Space className={styles.row}>
        <Space pr="xxxxl" className={styles.columnLeft}>
          <Space className={styles.localViewContainer}>
            <Space mt="s" className={styles.infoBarContainer}>
              {localCamera?.label && <InfoBar testID="CameraInfo" iconName="camera" text={localCamera.label} />}
              {localMicrophone?.label && (
                <InfoBar testID="MicrophoneInfo" iconName="microphone" text={localMicrophone.label} />
              )}
              {localSpeakers?.label && <InfoBar testID="SpeakersInfo" iconName="speaker" text={localSpeakers.label} />}
            </Space>
            <VideoLocalView
              testID="DeviceSetupVideoLocalView"
              username={username}
              isMicrophonePermission={isMicrophonePermission}
            />
          </Space>
          <Space mt="m" className={styles.buttonsBar}>
            <ToggleMicrophoneButton size="l" permissions={isMicrophonePermission} />
            <Space className={styles.spacer} />
            <ToggleVideoButton size="l" permissions={isCameraPermission} />
          </Space>
        </Space>
        <Space className={styles.columnRight}>
          <Text testID="MeetingName" type="H1" color="black">
            {splitMeetingAlias(uniqueMeetingName)[0]}
          </Text>
          <JoinConferenceButton
            id="JoinButton"
            testID="DeviceSetupJoinButton"
            joinOptions={joinOptions}
            meetingName={uniqueMeetingName}
            tooltipText="Join"
            tooltipPosition="bottom"
            onInitialise={onInitialise}
            disabled={!isAllPermission}
            onSuccess={onSuccess}
            style={{ width: 400 }}
            onError={onJoinError}
          >
            <Text testID="JoinbuttonText" type="buttonDefault" labelKey="joinNow" />
          </JoinConferenceButton>
          {!isAllPermission && (
            <Space className={styles.columnLeft}>
              <Text
                testID="PermissionsWarning"
                type="captionRegular"
                color="grey.500"
                labelKey="permissionsWarning"
                align="center"
              />
              <Text labelKey="deviceInitialization" type="caption" color="grey.200" align="center" />
            </Space>
          )}
        </Space>
      </Space>
      {!isMobile && showOnboarding && (
        <Onboarding name="deviceSetup" steps={hostDeviceSetupSteps} onComplete={() => setShowOnboarding(false)} />
      )}
      <SideDrawer />
    </Space>
  );
};
