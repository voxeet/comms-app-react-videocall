import type { ColorKey } from '@dolbyio/comms-uikit-react';
import { useTheme, IconButton, IconButtonProps, Space } from '@dolbyio/comms-uikit-react';
import useDrawer from '@hooks/useDrawer';
import MobileContent from '@src/components/SideDrawer/DrawerCloseButton/MobileContent';
import React from 'react';

import styles from './DrawerCloseButton.module.scss';

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
  const { getColor, isMobile, isMobileSmall } = useTheme();
  const { closeDrawer } = useDrawer();

  if (isMobile || isMobileSmall) {
    return <MobileContent iconColor={mobileIconColor} />;
  }

  return (
    <Space className={styles.closeButtonWrapper} style={{ backgroundColor: getColor(outsideColor) }}>
      <IconButton
        backgroundColor={backgroundColor}
        iconColor={iconColor}
        strokeColor={strokeColor}
        variant="circle"
        icon="close"
        size="s"
        onClick={closeDrawer}
        testID="DrawerCloseButton"
        {...rest}
      />
    </Space>
  );
};
