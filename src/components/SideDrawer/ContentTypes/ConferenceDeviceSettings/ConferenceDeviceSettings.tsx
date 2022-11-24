import ToggleSettingsDrawerButton from '@components//ToggleSettingsDrawerButton';
import {
  IconButton,
  Space,
  useTheme,
  VideoLocalView,
  CameraSelect,
  MicrophoneSelect,
  SpeakersSelect,
  ThemeSelect,
  useMicrophone,
  useCamera,
  useSession,
  useBlur,
} from '@dolbyio/comms-uikit-react';
import useDrawer from '@hooks/useDrawer';
import { DrawerMainContent, DrawerFooter, DrawerHeader } from '@src/components/SideDrawer';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import styles from './ConferenceDeviceSettings.module.scss';

const darkProps = {
  labelColor: 'grey.100',
  textColor: 'grey.100',
  iconColor: 'grey.100',
  backgroundColor: 'grey.800',
  primaryBorderColor: 'grey.500',
  secondaryBorderColor: 'grey.600',
  hoverColor: 'grey.700',
};

const Settings = () => {
  const [isMicrophonePermission, setIsMicrophonePermission] = useState(false);
  const [isCameraPermission, setIsCameraPermission] = useState(false);
  const intl = useIntl();
  const { isDrawerOpen } = useDrawer();
  const { isDesktop, isMobile, isMobileSmall } = useTheme();
  const { participant } = useSession();

  const { getMicrophonePermission } = useMicrophone();
  const { getCameraPermission } = useCamera();
  const { isSupported } = useBlur();

  const isSmartphone = isMobile || isMobileSmall;

  const checkMicrophonePermission = async () => {
    const permission = await getMicrophonePermission();
    setIsMicrophonePermission(permission);
  };

  const checkCameraPermission = async () => {
    const permission = await getCameraPermission();
    setIsCameraPermission(permission);
  };

  useEffect(() => {
    checkMicrophonePermission();
    checkCameraPermission();
  }, []);

  return (
    <Space fw fh className={styles.contentContainer} testID="ConferenceDeviceSettings">
      <DrawerHeader
        title={intl.formatMessage({ id: 'settings' })}
        color="grey.100"
        borderColor="transparent"
        height={isSmartphone ? 48 : 110}
        closeButtonBackgroundColor="grey.500"
        closeButtonOutsideColor="grey.800"
        closeButtonIconColor="white"
        closeButtonStrokeColor="transparent"
        mobileCloseButtonColor="white"
      />
      <DrawerMainContent scrollbarColor="grey.600">
        <Space ph="m">
          <Space mb="m" className={styles.videoContainer}>
            <VideoLocalView
              cameraReverseButton={!isDesktop}
              testID="ConferenceSettingsDrawerLocalView"
              username={participant?.info.name}
              indicator={false}
              audio={false}
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
                {...darkProps}
              />
            </Space>
          )}
          {isMicrophonePermission && (
            <Space mb="m">
              <MicrophoneSelect
                testID="MicrophoneSelect"
                label={intl.formatMessage({ id: 'microphone' })}
                placeholder={intl.formatMessage({ id: 'microphone' })}
                {...darkProps}
              />
            </Space>
          )}
          <Space mb="m">
            <SpeakersSelect
              testID="SpeakersSelect"
              label={intl.formatMessage({ id: 'speakers' })}
              placeholder={intl.formatMessage({ id: 'speakers' })}
              defaultDeviceLabel={intl.formatMessage({ id: 'defaultSpeaker' })}
              {...darkProps}
            />
          </Space>
          <Space mb="m">
            <ThemeSelect
              testID="ThemeSelect"
              label={intl.formatMessage({ id: 'theme' })}
              placeholder={intl.formatMessage({ id: 'theme' })}
              {...darkProps}
            />
          </Space>
        </Space>
      </DrawerMainContent>
      {isDesktop && (
        <DrawerFooter>
          <Space fw fh className={styles.footerContainer}>
            <Space mh="m" mr="m" className={styles.buttonsSection}>
              {isSupported && (
                <>
                  <IconButton
                    testID="MockBlurButton"
                    backgroundColor="transparent"
                    icon="backgroundBlur"
                    iconColor="grey.300"
                    disabled
                  />
                  <Space className={styles.spacer} />
                </>
              )}
              <IconButton
                testID="MockParticipantsButton"
                backgroundColor="transparent"
                iconColor="grey.300"
                icon="participants"
                disabled
              />
              <Space className={styles.spacer} />
              <ToggleSettingsDrawerButton badge={isDrawerOpen} />
            </Space>
          </Space>
        </DrawerFooter>
      )}
    </Space>
  );
};

export default Settings;
