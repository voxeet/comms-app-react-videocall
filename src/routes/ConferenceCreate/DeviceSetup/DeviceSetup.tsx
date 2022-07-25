import {
  useAudio,
  useCamera,
  useConference,
  useMicrophone,
  useSession,
  useVideo,
  VideoLocalView,
  Button,
  Space,
  DeviceInfo,
  useSpeaker,
} from '@dolbyio/comms-uikit-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DeviceSetupDrawer from '../../../components/DeviceSetupDrawer';
import OverlaySpinner from '../../../components/OverlaySpinner';
import Text from '../../../components/Text';
import useConferenceCreate from '../../../hooks/useConferenceCreate';
import { Routes } from '../../../types/routes.types';

import styles from './DeviceSetup.module.scss';
import ToggleMicrophoneButton from './ToggleMicrophoneButton';
import ToggleVideoButton from './ToggleVideoButton';

export const DeviceSetup = () => {
  const navigate = useNavigate();
  const { openSession } = useSession();
  const { createConference, joinConference, leaveConference, conference } = useConference();
  const { getDefaultLocalCamera, getCameraPermission, localCamera, setLocalCamera } = useCamera();
  const { getMicrophonePermission, localMicrophone } = useMicrophone();
  const { localSpeakers } = useSpeaker();
  const { isVideo } = useVideo();
  const { isAudio } = useAudio();
  const { meetingName, username } = useConferenceCreate();

  const [isAllPermission, setIsAllPermission] = useState<boolean>(false);
  const [isCameraPermission, setIsCameraPermission] = useState<boolean>(false);
  const [isMicrophonePermission, setIsMicrophonePermission] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

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
    (async () => {
      if (conference) {
        try {
          await leaveConference();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (isAllPermission && localCamera === null) {
      (async () => {
        setLocalCamera(await getDefaultLocalCamera());
      })();
    }
  }, [isAllPermission, localCamera]);

  const join = async () => {
    setIsLoading(true);
    await openSession({
      name: username,
    });

    const conferenceOptions = {
      alias: meetingName,
    };
    const conf = await createConference(conferenceOptions);

    const joinOptions = {
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
    };

    await joinConference(conf, joinOptions);
    navigate(`${Routes.Conference}?id=${encodeURIComponent(meetingName)}`);
  };

  if (isLoading) {
    return <OverlaySpinner textID="joiningMeeting" />;
  }

  return (
    <Space className={styles.container}>
      <DeviceSetupDrawer />
      <Space className={styles.row}>
        <Space pr="xxxxl" className={styles.columnLeft}>
          <Space className={styles.localViewContainer}>
            <Space mt="s" className={styles.toastContainer}>
              {localCamera && <DeviceInfo testID="CameraInfo" icon="camera" device={localCamera.label} />}
              {localMicrophone && (
                <DeviceInfo testID="MicrophoneInfo" icon="microphone" device={localMicrophone.label} />
              )}
              {localSpeakers && <DeviceInfo testID="SpeakersInfo" icon="speaker" device={localSpeakers.label} />}
            </Space>
            <VideoLocalView testID="DeviceSetupVideoLocalView" username={username} />
          </Space>
          <Space mt="m" className={styles.buttonsBar}>
            <ToggleMicrophoneButton permissions={isMicrophonePermission} />
            <Space className={styles.spacer} />
            <ToggleVideoButton permissions={isCameraPermission} />
          </Space>
        </Space>
        <Space className={styles.columnRight}>
          <Text testID="MeetingName" type="H1" color="black">
            {meetingName}
          </Text>
          <Button testID="DeviceSetupJoinButton" variant="primary" onClick={join} style={{ width: 400, height: 56 }}>
            <Text testID="JoinbuttonText" type="buttonDefault" id="joinNow" />
          </Button>
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
    </Space>
  );
};
