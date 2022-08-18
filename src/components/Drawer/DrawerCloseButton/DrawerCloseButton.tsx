/* eslint-disable react/jsx-props-no-spreading */
import type { ColorKey } from '@dolbyio/comms-uikit-react';
import { useTheme, IconButton, IconButtonProps, Space } from '@dolbyio/comms-uikit-react';
import React from 'react';

import useDrawer from '../../../hooks/useDrawer';

import styles from './DrawerCloseButton.module.scss';
import MobileContent from './MobileContent';

type DrawerCloseButtonProps = {
  outsideColor: ColorKey;
  mobileIconColor: ColorKey;
} & Partial<IconButtonProps>;

export const DrawerCloseButton = ({
  iconColor,
  backgroundColor,
  outsideColor,
  strokeColor,
  mobileIconColor,
  ...rest
}: DrawerCloseButtonProps) => {
  const { closeDrawer } = useDrawer();
  const { getColor, isMobile, isMobileSmall } = useTheme();

  if (isMobile || isMobileSmall) {
    return <MobileContent close={closeDrawer} iconColor={mobileIconColor} />;
  }

  return (
    <Space className={styles.closeButtonWrapper} style={{ backgroundColor: getColor(outsideColor) }}>
      <IconButton
        {...rest}
        backgroundColor={backgroundColor}
        iconColor={iconColor}
        strokeColor={strokeColor}
        variant="circle"
        icon="close"
        size="s"
        onClick={closeDrawer}
        testID="DrawerCloseButton"
      />
    </Space>
  );
};
