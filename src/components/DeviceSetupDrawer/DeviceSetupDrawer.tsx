import {
  VideoLocalView,
  Space,
  ThemeSelect,
  SpeakersSelect,
  MicrophoneSelect,
  CameraSelect,
  useTheme,
  useVideo,
} from '@dolbyio/comms-uikit-react';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import useConferenceCreate from '../../hooks/useConferenceCreate';
import useDrawer from '../../hooks/useDrawer';
import { Drawer, DrawerContent, DrawerHeader } from '../Drawer';

import styles from './DeviceSetupDrawer.module.scss';

type DeviceSetupDrawerProps = {
  isMicrophonePermission: boolean;
  isCameraPermission?: boolean;
};

export const DeviceSetupDrawer = ({ isMicrophonePermission, isCameraPermission }: DeviceSetupDrawerProps) => {
  const intl = useIntl();
  const { username } = useConferenceCreate();
  const { isTablet, isMobile, isMobileSmall, isLandscape, isDesktop } = useTheme();
  const { isDrawerOpen } = useDrawer();

  const videoDimensions = {
    desktop: {
      short: 158,
      long: 280,
    },
    tablet: {
      short: 135,
      long: 240,
    },
    mobile: {
      short: 112,
      long: 200,
    },
  };

  const videoSizes = useMemo(() => {
    let width = videoDimensions.desktop.long;
    let height = videoDimensions.desktop.short;

    if (isDesktop) {
      width = videoDimensions.desktop.long;
      height = videoDimensions.desktop.short;
    } else if (isMobile || isMobileSmall) {
      if (isLandscape) {
        width = videoDimensions.mobile.long;
        height = videoDimensions.mobile.short;
      } else {
        width = videoDimensions.mobile.short;
        height = videoDimensions.mobile.long;
      }
    } else if (isTablet) {
      if (isLandscape) {
        width = videoDimensions.tablet.long;
        height = videoDimensions.tablet.short;
      } else {
        width = videoDimensions.tablet.short;
        height = videoDimensions.tablet.long;
      }
    }

    return { width, height };
  }, [isMobile, isMobileSmall, isLandscape, videoDimensions, isDesktop]);

  return (
    <Drawer testID="DeviceSetupDrawer" backgroundColor="white" backdrop>
      <DrawerHeader
        height={!isDesktop && !isTablet ? 50 : 80}
        title={intl.formatMessage({ id: 'settings' })}
        color="black"
      />
      <DrawerContent scrollbarColor="grey.100">
        <Space ph="m">
          <Space mb="m" className={styles.videoContainer}>
            <VideoLocalView
              cameraReverseButton={!isDesktop}
              testID="DeviceSetupDrawerLocalView"
              width={videoSizes.width}
              height={videoSizes.height}
              username={username}
              indicator={false}
              audio={false}
              disabled={!isDrawerOpen}
              isMicrophonePermission={isMicrophonePermission}
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
      </DrawerContent>
    </Drawer>
  );
};
