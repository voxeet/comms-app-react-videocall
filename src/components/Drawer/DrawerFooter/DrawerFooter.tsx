import { Space } from '@dolbyio/comms-uikit-react';
import React from 'react';

import styles from './DrawerFooter.module.scss';

type DrawerFooterProps = {
  children: React.ReactNode;
};

export const DrawerFooter = ({ children }: DrawerFooterProps) => {
  return (
    <Space testID="DrawerFooter" className={styles.footer}>
      {children}
    </Space>
  );
};
