import {
  VideoLocalView,
  Space,
  ThemeSelect,
  SpeakersSelect,
  MicrophoneSelect,
  CameraSelect,
  useTheme,
  useCamera,
  useMicrophone,
} from '@dolbyio/comms-uikit-react';
import useConferenceCreate from '@hooks/useConferenceCreate';
import useDrawer from '@hooks/useDrawer';
import { DrawerMainContent, DrawerHeader } from '@src/components/SideDrawer';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import styles from './DeviceSetup.module.scss';

const DeviceSetup = () => {
  const [isCameraPermission, setIsCameraPermission] = useState<boolean>(false);
  const [isMicrophonePermission, setIsMicrophonePermission] = useState<boolean>(false);

  const { getCameraPermission } = useCamera();
  const { getMicrophonePermission } = useMicrophone();
  const intl = useIntl();
  const { username } = useConferenceCreate();
  const { isTablet, isDesktop } = useTheme();
  const { isDrawerOpen } = useDrawer();

  const checkCameraPermission = async () => {
    try {
      const hasCameraAccess = await getCameraPermission();
      setIsCameraPermission(hasCameraAccess);
    } catch {
      setIsCameraPermission(false);
    }
  };

  const checkMicrophonePermission = async () => {
    try {
      const hasMicrophoneAccess = await getMicrophonePermission();
      setIsMicrophonePermission(hasMicrophoneAccess);
    } catch {
      setIsMicrophonePermission(false);
    }
  };

  useEffect(() => {
    checkCameraPermission();
    checkMicrophonePermission();
  }, []);

  return (
    <Space fw fh testID="DeviceSetup" className={styles.contentContainer}>
      <DrawerHeader
        height={!isDesktop && !isTablet ? 50 : 80}
        title={intl.formatMessage({ id: 'settings' })}
        color="black"
      />
      <DrawerMainContent scrollbarColor="grey.100">
        <Space ph="m">
          <Space mb="m" className={styles.videoContainer}>
            <VideoLocalView
              cameraReverseButton={!isDesktop}
              testID="DeviceSetupDrawerLocalView"
              username={username}
              disabled={!isDrawerOpen}
              isMicrophonePermission={isMicrophonePermission}
              className={styles.videoRwd}
            />
          </Space>
          {isDesktop && isCameraPermission && (
            <Space mb="m">
              <CameraSelect
                testID="CameraSelect"
                label={intl.formatMessage({ id: 'camera' })}
                placeholder={intl.formatMessage({ id: 'camera' })}
              />
            </Space>
          )}
          {isMicrophonePermission && (
            <Space mb="m">
              <MicrophoneSelect
                testID="MicrophoneSelect"
                label={intl.formatMessage({ id: 'microphone' })}
                placeholder={intl.formatMessage({ id: 'microphone' })}
              />
            </Space>
          )}
          <Space mb="m">
            <SpeakersSelect
              testID="SpeakersSelect"
              label={intl.formatMessage({ id: 'speakers' })}
              placeholder={intl.formatMessage({ id: 'speakers' })}
              defaultDeviceLabel={intl.formatMessage({ id: 'defaultSpeaker' })}
            />
          </Space>
          <Space mb="m">
            <ThemeSelect
              testID="ThemeSelect"
              label={intl.formatMessage({ id: 'theme' })}
              placeholder={intl.formatMessage({ id: 'theme' })}
            />
          </Space>
        </Space>
      </DrawerMainContent>
    </Space>
  );
};

export default DeviceSetup;
