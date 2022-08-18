/* eslint-disable react/jsx-props-no-spreading */
import type { ColorKey } from '@dolbyio/comms-uikit-react';
import { useTheme, Space } from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import React from 'react';

import useDrawer from '../../hooks/useDrawer';

import Backdrop from './Backdrop';
import styles from './Drawer.module.scss';

export type DrawerProps = {
  children: React.ReactNode;
  backgroundColor?: ColorKey;
  backdrop?: boolean;
  testID?: string;
};

export const Drawer = ({ children, backgroundColor, backdrop, testID }: DrawerProps) => {
  const { isDrawerOpen, closeDrawer } = useDrawer();
  const { getColor, isMobile, isMobileSmall } = useTheme();

  const isSmartphone = isMobile || isMobileSmall;

  return (
    <>
      <Backdrop visible={backdrop && isDrawerOpen} onClick={closeDrawer} />
      <Space
        fw={isSmartphone}
        fh
        testID={testID}
        className={cx(styles.drawer, isSmartphone && styles.mobile, isDrawerOpen && styles.active)}
        style={{ backgroundColor: getColor(backgroundColor, 'grey.800') }}
      >
        {isDrawerOpen && (
          <Space fw fh className={styles.container}>
            {children}
          </Space>
        )}
      </Space>
    </>
  );
};

export default Drawer;
