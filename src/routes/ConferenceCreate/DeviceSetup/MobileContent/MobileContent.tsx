import { SideDrawer } from '@components/SideDrawer';
import Text from '@components/Text';
import {
  VideoLocalView,
  JoinConferenceButton,
  Space,
  InfoBar,
  useTheme,
  TextProps,
  SpaceValues,
} from '@dolbyio/comms-uikit-react';
import ToggleMicrophoneButton from '@src/routes/ConferenceCreate/DeviceSetup/ToggleMicrophoneButton';
import ToggleVideoButton from '@src/routes/ConferenceCreate/DeviceSetup/ToggleVideoButton';
import { splitMeetingAlias } from '@src/utils/misc';

import React, { useMemo } from 'react';

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
  onError: () => Promise<void>;
  joinOptions: Pick<React.ComponentProps<typeof JoinConferenceButton>, 'joinOptions'>['joinOptions'];
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
  onError,
  joinOptions,
}: MobileContentProps) => {
  const { isMobile, isMobileSmall, isTablet } = useTheme();

  const meetingNameTopMargin = useMemo(() => {
    let value: SpaceValues = 'xxl';

    if (isMobile || isMobileSmall) {
      value = 'm';
    }

    return value;
  }, [isMobile, isMobileSmall]);

  const videoTopMargin = useMemo(() => {
    let value: SpaceValues = 'm';

    if (isMobile || isMobileSmall) {
      value = 's';
    }

    return value;
  }, [isMobile, isMobileSmall]);

  const buttonsSectionTopMargin = useMemo(() => {
    let value: SpaceValues = 'm';

    if (isMobile || isMobileSmall) {
      value = 's';
    }

    return value;
  }, [isMobile, isMobileSmall]);

  const joinButtonTopMargin = useMemo(() => {
    let value: SpaceValues = 'xl';

    if (isMobile || isMobileSmall) {
      value = 'm';
    }

    return value;
  }, [isMobile, isMobileSmall]);

  const permissionsWarningTopMargin = useMemo(() => {
    let value: SpaceValues = 'm';

    if (isMobile || isMobileSmall) {
      value = 's';
    }

    return value;
  }, [isMobile, isMobileSmall]);

  const joinButtonWidth = useMemo(() => {
    let value: string | number = joinButtonWidthValue.medium;

    if (isMobile || isMobileSmall) {
      value = joinButtonWidthValue.small;
    }

    return value;
  }, [isMobile, isMobileSmall]);

  const permissionsWarningWidth = useMemo(() => {
    let value: string | number = permissionsWarningWidthValue.medium;

    if (isMobile || isMobileSmall) {
      value = permissionsWarningWidthValue.small;
    }

    return value;
  }, [isMobile, isMobileSmall]);

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
            {splitMeetingAlias(meetingName)[0]}
          </Text>
        </Space>
        <Space mt={videoTopMargin} className={styles.localVideo}>
          <VideoLocalView
            testID="DeviceSetupVideoLocalView"
            username={username}
            cameraReverseButton={isCameraPermission}
            isMicrophonePermission={isMicrophonePermission}
            className={styles.videoRwd}
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
            onInitialise={onInitialise}
            onSuccess={onSuccess}
            onError={onError}
            style={{ width: joinButtonWidth, height: 48 }}
          >
            <Text testID="JoinbuttonText" type="buttonDefault" labelKey="joinNow" />
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
              labelKey="permissionsWarning"
              align="center"
            />
          )}
        </Space>
        <Space mt="s" className={styles.infoBarContainer}>
          {localCamera?.label && (
            <InfoBar testID="CameraInfo" iconName="camera" text={localCamera.label} duration={4000} />
          )}
          {localMicrophone?.label && (
            <InfoBar testID="MicrophoneInfo" iconName="microphone" text={localMicrophone.label} duration={4000} />
          )}
          {localSpeakers?.label && (
            <InfoBar testID="SpeakersInfo" iconName="speaker" text={localSpeakers.label} duration={4000} />
          )}
        </Space>
      </Space>
      <SideDrawer />
    </>
  );
};

export default MobileContent;
