import type { ColorKey } from '@dolbyio/comms-uikit-react';
import { useTheme, Space, Overlay } from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import React, { useMemo } from 'react';

import useDrawer from '../../hooks/useDrawer';

import styles from './Drawer.module.scss';

export type DrawerProps = {
  children: React.ReactNode;
  backgroundColor?: ColorKey;
  backdrop?: boolean;
  backdropOpacity?: number;
  testID?: string;
};

const isSafariMobile = navigator.userAgent.match(/safari/i) && !('chrome' in window);

export const Drawer = ({ children, backgroundColor, backdrop, backdropOpacity = 0.24, testID }: DrawerProps) => {
  const { isDrawerOpen, closeDrawer } = useDrawer();
  const { getColor, isMobile, isMobileSmall } = useTheme();

  const isSmartphone = isMobile || isMobileSmall;
  const isSafariTablet = isSafariMobile && !isSmartphone;

  const content = useMemo(
    () => (
      <Space
        fw={isSmartphone}
        fh
        testID={testID}
        className={cx(styles.drawer, isSmartphone && styles.mobile, isDrawerOpen && styles.active)}
        style={{ backgroundColor: getColor(backgroundColor, 'grey.800') }}
      >
        <Space fw fh className={styles.container}>
          {isDrawerOpen && children}
        </Space>
      </Space>
    ),
    [isSmartphone, isDrawerOpen],
  );

  return (
    <>
      <Overlay visible={backdrop && isDrawerOpen} onClick={closeDrawer} opacity={backdropOpacity} />
      {(!isSafariTablet || isDrawerOpen) && content}
    </>
  );
};

export default Drawer;
