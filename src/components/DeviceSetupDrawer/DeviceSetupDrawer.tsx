import {
  VideoLocalView,
  Space,
  ThemeSelect,
  SpeakersSelect,
  MicrophoneSelect,
  CameraSelect,
} from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

import useConferenceCreate from '../../hooks/useConferenceCreate';
import { Drawer, DrawerCloseButton, DrawerContent, DrawerHeader } from '../Drawer';

export const DeviceSetupDrawer = () => {
  const intl = useIntl();
  const { username } = useConferenceCreate();
  return (
    <Drawer testID="DeviceSetupDrawer" backgroundColor="white" backdrop>
      <DrawerCloseButton iconColor="purple" backgroundColor="white" strokeColor="purple" />
      <DrawerHeader title={intl.formatMessage({ id: 'settings' })} color="black" />
      <DrawerContent>
        <Space ph="m">
          <Space mb="m">
            <VideoLocalView
              testID="DeviceSetupDrawerLocalView"
              width={316}
              height={180}
              username={username}
              indicator={false}
              audio={false}
            />
          </Space>
          <Space mb="m">
            <CameraSelect
              testID="CameraSelect"
              label={intl.formatMessage({ id: 'camera' })}
              placeholder={intl.formatMessage({ id: 'camera' })}
            />
          </Space>
          <Space mb="m">
            <MicrophoneSelect
              testID="MicrophoneSelect"
              label={intl.formatMessage({ id: 'microphone' })}
              placeholder={intl.formatMessage({ id: 'microphone' })}
            />
          </Space>
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
