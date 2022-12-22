import ToggleSettingsDrawerButton from '@components//ToggleSettingsDrawerButton';
import RangeInput from '@components/RangeInput';
import Switch from '@components/Switch';
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
  useAudioProcessing,
  useConference,
} from '@dolbyio/comms-uikit-react';
import useDrawer from '@hooks/useDrawer';
import { DrawerMainContent, DrawerFooter, DrawerHeader, DrawerOption } from '@src/components/SideDrawer';
import { debounce } from '@src/utils/misc';
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
  const { toggleEchoCancellation, echoCancellation } = useAudioProcessing();
  const { setVideoForwarding, maxVideoForwarding } = useConference();

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

  const setParticipantsVideoTiles = (value: number) => {
    setVideoForwarding(value);
  };

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
      <DrawerMainContent scrollbarColor="grey.600">
        <Space>
          <DrawerOption
            testID="EchoOption"
            icon="echo"
            headline="echoOptionHeadline"
            description="echoOptionDsc"
            headlineActionComponent={<Switch isActive={!!echoCancellation} onClick={toggleEchoCancellation} />}
          />
          {isDesktop && (
            <DrawerOption icon="tiles" headline="videoForwardingOptionHeadline" description="videoForwardingOptionDsc">
              <RangeInput
                minValue={1}
                maxValue={24}
                callback={debounce<[value: number]>((value) => {
                  setParticipantsVideoTiles(value);
                }, 350)}
                value={maxVideoForwarding}
              />
            </DrawerOption>
          )}
          {isDesktop && isCameraPermission && (
            <DrawerOption testID="CameraOption">
              {(containerProps) => (
                <CameraSelect
                  testID="CameraSelect"
                  label={intl.formatMessage({ id: 'camera' })}
                  placeholder={intl.formatMessage({ id: 'camera' })}
                  containerProps={containerProps}
                  {...darkProps}
                />
              )}
            </DrawerOption>
          )}
          {isMicrophonePermission && (
            <DrawerOption testID="MicrophoneOption">
              {(containerProps) => (
                <MicrophoneSelect
                  testID="MicrophoneSelect"
                  label={intl.formatMessage({ id: 'microphone' })}
                  placeholder={intl.formatMessage({ id: 'microphone' })}
                  containerProps={containerProps}
                  {...darkProps}
                />
              )}
            </DrawerOption>
          )}
          <DrawerOption testID="SpeakerOption">
            {(containerProps) => (
              <SpeakersSelect
                testID="SpeakersSelect"
                label={intl.formatMessage({ id: 'speakers' })}
                placeholder={intl.formatMessage({ id: 'speakers' })}
                defaultDeviceLabel={intl.formatMessage({ id: 'defaultSpeaker' })}
                containerProps={containerProps}
                {...darkProps}
              />
            )}
          </DrawerOption>
          <DrawerOption testID="ThemeOption">
            <ThemeSelect
              testID="ThemeSelect"
              label={intl.formatMessage({ id: 'theme' })}
              placeholder={intl.formatMessage({ id: 'theme' })}
              {...darkProps}
            />
          </DrawerOption>
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
