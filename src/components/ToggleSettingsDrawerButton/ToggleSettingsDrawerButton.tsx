import { SideDrawerContentTypes } from '@context/SideDrawerContext';
import { Tooltip, IconButton, ColorKey } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

import useDrawer from '../../hooks/useDrawer';

type ToggleSettingsDrawerButtonProps = {
  backgroundColor?: ColorKey;
  badge?: boolean;
  onOpenAction?: () => void;
};

const ToggleSettingsDrawerButton = ({
  backgroundColor = 'transparent',
  badge = false,
  onOpenAction,
}: ToggleSettingsDrawerButtonProps) => {
  const { isDrawerOpen, contentType, openDrawer, closeDrawer } = useDrawer();
  const intl = useIntl();

  const isVisible = isDrawerOpen && contentType === SideDrawerContentTypes.CONFERENCE_SETTINGS;

  const handleOnClick = () => {
    if (isVisible) {
      closeDrawer();
    } else {
      openDrawer(SideDrawerContentTypes.CONFERENCE_SETTINGS);
      onOpenAction?.();
    }
  };

  return (
    <Tooltip position="top" text={isVisible ? '' : intl.formatMessage({ id: 'settings' })}>
      <IconButton
        testID="OpenSettingsButton"
        icon="settings"
        backgroundColor={backgroundColor}
        badge={badge}
        badgeColor="primary.300"
        onClick={handleOnClick}
      />
    </Tooltip>
  );
};

export default ToggleSettingsDrawerButton;
