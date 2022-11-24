import { useAudio, MediaButton } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

type ToggleMicrophoneButtonProps = {
  size?: 's' | 'm' | 'l';
  permissions?: boolean;
};

export const ToggleMicrophoneButton = ({ size = 'm', permissions = false }: ToggleMicrophoneButtonProps) => {
  const { isAudio, toggleAudio } = useAudio();
  const intl = useIntl();

  return (
    <MediaButton
      defaultBackgroundColor="white"
      activeBackgroundColor="white"
      disabledBackgroundColor="white"
      defaultIconColor="primary.400"
      activeIconColor="grey.300"
      disabledIconColor="grey.100"
      defaultStrokeColor="primary.400"
      activeStrokeColor="grey.300"
      disabledStrokeColor="grey.100"
      defaultIcon="microphone"
      activeIcon="microphoneOff"
      disabledIcon="microphoneOff"
      defaultTooltipText={intl.formatMessage({ id: 'mute' })}
      activeTooltipText={intl.formatMessage({ id: 'unmute' })}
      isActive={!isAudio}
      isDisabled={!permissions}
      onClick={toggleAudio}
      size={size}
      testID="DeviceSetupToggleMicrophoneButton"
    />
  );
};
