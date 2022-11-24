import { useVideo, MediaButton } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

type ToggleVideoButtonProps = {
  size?: 's' | 'm' | 'l';
  permissions?: boolean;
};

export const ToggleVideoButton = ({ size = 'm', permissions = false }: ToggleVideoButtonProps) => {
  const { isVideo, toggleVideo } = useVideo();
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
      defaultIcon="camera"
      activeIcon="cameraOff"
      disabledIcon="cameraOff"
      defaultTooltipText={intl.formatMessage({ id: 'cameraOff' })}
      activeTooltipText={intl.formatMessage({ id: 'cameraOn' })}
      isActive={!isVideo}
      isDisabled={!permissions}
      onClick={toggleVideo}
      size={size}
      testID="DeviceSetupToggleVideoButton"
    />
  );
};
