import {
  useAudio,
  useCamera,
  useMicrophone,
  useVideo,
  VideoLocalView,
  Space,
  Toast,
  useSpeaker,
  useTheme,
  BlockedAudioStateType,
  JoinConferenceButton,
} from '@dolbyio/comms-uikit-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DeviceSetupDrawer from '../../../components/DeviceSetupDrawer';
import OverlaySpinner from '../../../components/OverlaySpinner';
import Text from '../../../components/Text';
import useConferenceCreate from '../../../hooks/useConferenceCreate';
import useDrawer from '../../../hooks/useDrawer';
import { Routes } from '../../../types/routes.types';

import styles from './DeviceSetup.module.scss';
import MobileContent from './MobileContent';
import ToggleMicrophoneButton from './ToggleMicrophoneButton';
import ToggleVideoButton from './ToggleVideoButton';

export const DeviceSetup = () => {
  const navigate = useNavigate();
  const { getDefaultLocalCamera, getCameraPermission, localCamera, setLocalCamera } = useCamera();
  const { getMicrophonePermission, localMicrophone } = useMicrophone();
  const { localSpeakers } = useSpeaker();
  const { isVideo } = useVideo();
  const { isAudio } = useAudio();
  const { meetingName, username } = useConferenceCreate();
  const { isTablet, isMobile, isMobileSmall } = useTheme();
  const { blockedAudioState, markBlockedAudioActivated } = useAudio();
  const { isDrawerOpen } = useDrawer();

  const [isAllPermission, setIsAllPermission] = useState<boolean>(false);
  const [isCameraPermission, setIsCameraPermission] = useState<boolean>(false);
  const [isMicrophonePermission, setIsMicrophonePermission] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

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

  useEffect(() => {
    checkPermissions();
  }, []);

  useEffect(() => {
    if (isAllPermission && localCamera === null) {
      (async () => {
        setLocalCamera(await getDefaultLocalCamera());
      })();
    }
  }, [isAllPermission, localCamera]);

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
    navigate(`${Routes.Conference}?id=${encodeURIComponent(meetingName)}`);
  };

  const joinOptions = useMemo(
    () => ({
      constraints: {
        audio: isMicrophonePermission && isAudio,
        video:
          isCameraPermission && isVideo
            ? {
                width: {
                  min: '1280',
                  max: '1920',
                },
                height: {
                  min: '720',
                  max: '1080',
                },
              }
            : false,
      },
    }),
    [isCameraPermission, isMicrophonePermission, isVideo, isAudio],
  );

  if (isLoading) {
    return <OverlaySpinner textID="joiningMeeting" />;
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
            <Space mt="s" className={styles.toastContainer}>
              {localCamera?.label && <Toast testID="CameraInfo" iconName="camera" text={localCamera.label} />}
              {localMicrophone?.label && (
                <Toast testID="MicrophoneInfo" iconName="microphone" text={localMicrophone.label} />
              )}
              {localSpeakers?.label && <Toast testID="SpeakersInfo" iconName="speaker" text={localSpeakers.label} />}
            </Space>
            <VideoLocalView
              testID="DeviceSetupVideoLocalView"
              username={username}
              disabled={isDrawerOpen}
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
            username={username}
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
      <DeviceSetupDrawer isMicrophonePermission={isMicrophonePermission} isCameraPermission={isCameraPermission} />
    </Space>
  );
};
