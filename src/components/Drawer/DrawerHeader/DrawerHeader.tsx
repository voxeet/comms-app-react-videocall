import type { ColorKey } from '@dolbyio/comms-uikit-react';
import { Text, Space } from '@dolbyio/comms-uikit-react';
import React from 'react';

import styles from './DrawerHeader.module.scss';

export type DrawerHeaderProps = {
  title: string;
  color?: ColorKey;
};

export const DrawerHeader = ({ title, color }: DrawerHeaderProps) => {
  return (
    <Space testID="DrawerHeader" pt="m" className={styles.topSection}>
      <Text type="H3" color={color}>
        {title}
      </Text>
    </Space>
  );
};
