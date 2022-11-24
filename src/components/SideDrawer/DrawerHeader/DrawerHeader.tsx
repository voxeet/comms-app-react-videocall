import { Text, Space, useTheme, ColorKey } from '@dolbyio/comms-uikit-react';
import { DrawerCloseButton } from '@src/components/SideDrawer/DrawerCloseButton/DrawerCloseButton';
import cx from 'classnames';
import React from 'react';

import styles from './DrawerHeader.module.scss';

export type DrawerHeaderProps = {
  title: string;
  color?: ColorKey;
  height?: number;
  borderColor?: ColorKey;
  closeButtonBackgroundColor?: ColorKey;
  closeButtonOutsideColor?: ColorKey;
  closeButtonIconColor?: ColorKey;
  closeButtonStrokeColor?: ColorKey;
  mobileCloseButtonColor?: ColorKey;
};

export const DrawerHeader = ({
  title,
  color,
  height = 80,
  borderColor = 'grey.100',
  closeButtonBackgroundColor = 'white',
  closeButtonOutsideColor = 'white',
  closeButtonIconColor = 'purple',
  closeButtonStrokeColor = 'purple',
  mobileCloseButtonColor = 'black',
}: DrawerHeaderProps) => {
  const { getColor, isMobile, isMobileSmall } = useTheme();

  const isSmartphone = isMobile || isMobileSmall;

  return (
    <Space
      testID="DrawerHeader"
      className={cx(styles.container, isSmartphone && styles.mobile)}
      style={{ height, borderColor: getColor(borderColor) }}
    >
      <Text type="H3" color={color}>
        {title}
      </Text>
      <Space className={styles.buttonPosition}>
        <DrawerCloseButton
          iconColor={closeButtonIconColor}
          backgroundColor={closeButtonBackgroundColor}
          outsideColor={closeButtonOutsideColor}
          strokeColor={closeButtonStrokeColor}
          mobileIconColor={mobileCloseButtonColor}
        />
      </Space>
    </Space>
  );
};
