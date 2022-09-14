import type { SpaceValues } from '@dolbyio/comms-uikit-common/src/theme/types';
import { VideoLocalView, JoinConferenceButton, Space, Toast, useTheme, TextProps } from '@dolbyio/comms-uikit-react';
import { VideoViewProps } from '@dolbyio/comms-uikit-react/src/components/ui/VideoLocalView/VideoLocalView';
import React, { useMemo } from 'react';

import DeviceSetupDrawer from '../../../../components/DeviceSetupDrawer';
import Text from '../../../../components/Text';
import useDrawer from '../../../../hooks/useDrawer';
import ToggleMicrophoneButton from '../ToggleMicrophoneButton';
import ToggleVideoButton from '../ToggleVideoButton';

import styles from './MobileContent.module.scss';

type MobileContentProps = {
  localMicrophone: Partial<MediaDeviceInfo> | null;
  localCamera: Partial<MediaDeviceInfo> | null;
  localSpeakers: Partial<MediaDeviceInfo> | null;
  username: string;
  meetingName: string;
  isMicrophonePermission: boolean;
  isCameraPermission: boolean;
  isAllPermission: boolean;
  onInitialise: () => Promise<void>;
  onSuccess: () => Promise<void>;
  joinOptions: Pick<React.ComponentProps<typeof JoinConferenceButton>, 'joinOptions'>['joinOptions'];
};

const videoDimensions = {
  tablet: {
    short: 224,
    long: 399,
  },
  mobile: {
    short: 184,
    long: 328,
  },
  mobileSmall: {
    short: 112,
    long: 200,
  },
};

const joinButtonWidthValue = {
  small: 270,
  medium: 400,
};

const permissionsWarningWidthValue = {
  small: 270,
  medium: 350,
};

const MobileContent = ({
  localMicrophone,
  localCamera,
  localSpeakers,
  username,
  meetingName,
  isMicrophonePermission,
  isCameraPermission,
  isAllPermission,
  onInitialise,
  onSuccess,
  joinOptions,
}: MobileContentProps) => {
  const { isLandscape, isMobile, isMobileSmall, isTablet } = useTheme();
  const { isDrawerOpen } = useDrawer();

  const meetingNameTopMargin = useMemo(() => {
    let value: SpaceValues = 'xxl';

    if (isMobile || isMobileSmall) {
      value = 'm';
    }

    return value;
  }, [isMobile, isMobileSmall, isLandscape]);

  const videoTopMargin = useMemo(() => {
    let value: SpaceValues = 'm';

    if (isMobile || isMobileSmall) {
      value = 's';
    }

    return value;
  }, [isMobile, isMobileSmall, isLandscape]);

  const buttonsSectionTopMargin = useMemo(() => {
    let value: SpaceValues = 'm';

    if (isMobile || isMobileSmall) {
      value = 's';
    }

    return value;
  }, [isMobile, isMobileSmall, isLandscape]);

  const joinButtonTopMargin = useMemo(() => {
    let value: SpaceValues = 'xl';

    if (isMobile || isMobileSmall) {
      value = 'm';
    }

    return value;
  }, [isMobile, isMobileSmall, isLandscape]);

  const permissionsWarningTopMargin = useMemo(() => {
    let value: SpaceValues = 'm';

    if (isMobile || isMobileSmall) {
      value = 's';
    }

    return value;
  }, [isMobile, isMobileSmall, isLandscape]);

  const videoSizes = useMemo(() => {
    let width = videoDimensions.tablet.short;
    let height = videoDimensions.tablet.long;

    if (isTablet) {
      if (isLandscape) {
        width = videoDimensions.tablet.long;
        height = videoDimensions.tablet.short;
      } else {
        width = videoDimensions.tablet.short;
        height = videoDimensions.tablet.long;
      }
    } else if (isMobile) {
      if (isLandscape) {
        width = videoDimensions.mobile.long;
        height = videoDimensions.mobile.short;
      } else {
        width = videoDimensions.mobile.short;
        height = videoDimensions.mobile.long;
      }
    } else if (isMobileSmall) {
      if (isLandscape) {
        width = videoDimensions.mobileSmall.long;
        height = videoDimensions.mobileSmall.short;
      } else {
        width = videoDimensions.mobileSmall.short;
        height = videoDimensions.mobileSmall.long;
      }
    }

    return { width, height };
  }, [isMobile, isMobileSmall, isTablet, isLandscape, videoDimensions]);

  const joinButtonWidth = useMemo(() => {
    let value: string | number = joinButtonWidthValue.medium;

    if (isMobile || isMobileSmall) {
      value = joinButtonWidthValue.small;
    }

    return value;
  }, [isMobile, isMobileSmall, isTablet, isLandscape]);

  const permissionsWarningWidth = useMemo(() => {
    let value: string | number = permissionsWarningWidthValue.medium;

    if (isMobile || isMobileSmall) {
      value = permissionsWarningWidthValue.small;
    }

    return value;
  }, [isMobile, isMobileSmall, isTablet, isLandscape]);

  const titleTextType = useMemo(() => {
    let type: TextProps['type'] = 'h4';

    if (isTablet) {
      type = 'h4';
    } else if (isMobile) {
      type = 'h5Regular';
    } else if (isMobileSmall) {
      type = 'h6';
    }

    return type;
  }, [isTablet, isMobile, isMobileSmall]);

  return (
    <>
      <Space fw className={styles.container}>
        <Space mt={meetingNameTopMargin} className={styles.conferenceName}>
          <Text testID="MeetingName" type={titleTextType} color="black">
            {meetingName}
          </Text>
        </Space>
        <Space mt={videoTopMargin} className={styles.localVideo}>
          <VideoLocalView
            width={videoSizes.width}
            height={videoSizes.height}
            testID="DeviceSetupVideoLocalView"
            username={username}
            cameraReverseButton={isCameraPermission}
            disabled={isDrawerOpen}
            isMicrophonePermission={isMicrophonePermission}
          />
        </Space>
        <Space mt={buttonsSectionTopMargin} className={styles.mediaButtonsSection}>
          <ToggleMicrophoneButton size={isTablet ? 'l' : 's'} permissions={isMicrophonePermission} />
          <Space className={styles.spacer} />
          <ToggleVideoButton size={isTablet ? 'l' : 's'} permissions={isCameraPermission} />
        </Space>
        <Space mt={joinButtonTopMargin} className={styles.joinButton}>
          <JoinConferenceButton
            joinOptions={joinOptions}
            testID="DeviceSetupJoinButton"
            meetingName={meetingName}
            tooltipText="Join"
            username={username}
            onInitialise={onInitialise}
            onSuccess={onSuccess}
            style={{ width: joinButtonWidth, height: 48 }}
          >
            <Text testID="JoinbuttonText" type="buttonDefault" id="joinNow" />
          </JoinConferenceButton>
        </Space>
        <Space
          mt={permissionsWarningTopMargin}
          className={styles.mediaWarning}
          style={{ width: permissionsWarningWidth }}
        >
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
        <Space mt="s" className={styles.toastContainer}>
          {localCamera?.label && (
            <Toast testID="CameraInfo" iconName="camera" text={localCamera.label} duration={4000} />
          )}
          {localMicrophone?.label && (
            <Toast testID="MicrophoneInfo" iconName="microphone" text={localMicrophone.label} duration={4000} />
          )}
          {localSpeakers?.label && (
            <Toast testID="SpeakersInfo" iconName="speaker" text={localSpeakers.label} duration={4000} />
          )}
        </Space>
      </Space>
      <DeviceSetupDrawer isMicrophonePermission={isMicrophonePermission} />
    </>
  );
};

export const VoidFallbackComponent = ({ width = 712, height = 400 }: Pick<VideoViewProps, 'width' | 'height'>) => {
  return <Space style={{ width, height, backgroundColor: 'transparent' }} />;
};

export default MobileContent;
