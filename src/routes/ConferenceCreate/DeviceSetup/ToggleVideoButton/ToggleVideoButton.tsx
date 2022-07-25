import { useVideo, MediaButton } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

type ToggleVideoButtonProps = {
  permissions?: boolean;
};

export const ToggleVideoButton = ({ permissions = false }: ToggleVideoButtonProps) => {
  const { isVideo, toggleVideo } = useVideo();
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
      activeIcon="camera"
      inactiveIcon="cameraOff"
      disabledIcon="cameraOff"
      activeTooltipText={intl.formatMessage({ id: 'cameraOff' })}
      inactiveTooltipText={intl.formatMessage({ id: 'cameraOn' })}
      isActive={isVideo}
      isDisabled={!permissions}
      onClick={toggleVideo}
      testID="DeviceSetupToggleVideoButton"
    />
  );
};
