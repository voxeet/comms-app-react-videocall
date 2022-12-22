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
  useMicrophone,
  useNotifications,
  useSession,
  useSpeaker,
  useTheme,
  useVideo,
  VideoLocalView,
} from '@dolbyio/comms-uikit-react';
import useConferenceCreate from '@hooks/useConferenceCreate';
import { SideDrawer } from '@src/components/SideDrawer';
import MobileContent from '@src/routes/ConferenceCreate/DeviceSetup/MobileContent';
import ToggleMicrophoneButton from '@src/routes/ConferenceCreate/DeviceSetup/ToggleMicrophoneButton';
import ToggleVideoButton from '@src/routes/ConferenceCreate/DeviceSetup/ToggleVideoButton';
import { CreateStep, Routes } from '@src/types/routes';
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
  const { meetingName, username, setStep } = useConferenceCreate();
  const { isTablet, isMobile, isMobileSmall } = useTheme();

  const [isAllPermission, setIsAllPermission] = useState<boolean>(false);
  const [isCameraPermission, setIsCameraPermission] = useState<boolean>(false);
  const [isMicrophonePermission, setIsMicrophonePermission] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const intl = useIntl();
  const { openSession, participant, closeSession, isSessionOpened } = useSession();
  const { showErrorNotification } = useNotifications();

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  useEffect(() => {
    if (videoError) {
      showErrorNotification(intl.formatMessage({ id: 'videoRetrying' }));
      removeError();
    }
  }, [videoError]);

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
    checkPermissions();
    sessionSetup();
  }, []);

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
      params.append('id', meetingName);
    } else {
      params.set('id', meetingName);
    }
    navigate(`${Routes.Conference}?${params.toString()}`);
    setStep(CreateStep.meetingName);
  };

  const joinParams: JoinParams = {
    isMicrophonePermission,
    isCameraPermission,
    isAudio,
    isVideo,
  };

  const joinOptions = useMemo(() => {
    return setJoinOptions(joinParams);
  }, [isMicrophonePermission, isCameraPermission, isAudio, isVideo]);

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
        meetingName={meetingName}
        isMicrophonePermission={isMicrophonePermission}
        isCameraPermission={isCameraPermission}
        isAllPermission={isAllPermission}
        onInitialise={onInitialise}
        onSuccess={onSuccess}
        joinOptions={joinOptions}
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
            {meetingName}
          </Text>
          <JoinConferenceButton
            testID="DeviceSetupJoinButton"
            joinOptions={joinOptions}
            meetingName={meetingName}
            tooltipText="Join"
            tooltipPosition="bottom"
            onInitialise={onInitialise}
            onSuccess={onSuccess}
            style={{ width: 400 }}
          >
            <Text testID="JoinbuttonText" type="buttonDefault" id="joinNow" />
          </JoinConferenceButton>
          {!isAllPermission && (
            <Text
              testID="PermissionsWarning"
              type="captionRegular"
              color="grey.500"
              id="permissionsWarning"
              align="center"
            />
          )}
        </Space>
      </Space>
      <SideDrawer />
    </Space>
  );
};
