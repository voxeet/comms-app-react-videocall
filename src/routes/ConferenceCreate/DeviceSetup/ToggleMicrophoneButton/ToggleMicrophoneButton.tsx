import { useAudio, MediaButton } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

type ToggleMicrophoneButtonProps = {
  size?: 's' | 'm';
  permissions?: boolean;
};

export const ToggleMicrophoneButton = ({ size = 'm', permissions = false }: ToggleMicrophoneButtonProps) => {
  const { isAudio, toggleAudio } = useAudio();
  const intl = useIntl();

  return (
    <MediaButton
      activeBackgroundColor="white"
      inactiveBackgroundColor="white"
      disabledBackgroundColor="white"
      activeIconColor="primary.500"
      inactiveIconColor="grey.500"
      disabledIconColor="grey.300"
      activeStrokeColor="primary.500"
      inactiveStrokeColor="grey.500"
      disabledStrokeColor="grey.300"
      activeIcon="microphone"
      inactiveIcon="microphoneOff"
      disabledIcon="microphoneOff"
      activeTooltipText={intl.formatMessage({ id: 'mute' })}
      inactiveTooltipText={intl.formatMessage({ id: 'unmute' })}
      isActive={isAudio}
      isDisabled={!permissions}
      onClick={toggleAudio}
      size={size}
      testID="DeviceSetupToggleMicrophoneButton"
    />
  );
};
