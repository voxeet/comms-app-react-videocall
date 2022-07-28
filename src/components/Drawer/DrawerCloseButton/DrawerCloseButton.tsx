/* eslint-disable react/jsx-props-no-spreading */
import type { ColorKey } from '@dolbyio/comms-uikit-react';
import { useTheme, IconButton, IconButtonProps, Space } from '@dolbyio/comms-uikit-react';
import React from 'react';

import useDrawer from '../../../hooks/useDrawer';

import styles from './DrawerCloseButton.module.scss';

type DrawerCloseButtonProps = {
  backgroundColor?: ColorKey;
} & Partial<IconButtonProps>;

export const DrawerCloseButton = ({ backgroundColor, ...rest }: DrawerCloseButtonProps) => {
  const { closeDrawer } = useDrawer();
  const { getColor } = useTheme();

  return (
    <Space className={styles.closeButtonWrapper} style={{ backgroundColor: getColor(backgroundColor, 'background') }}>
      <IconButton
        {...rest}
        backgroundColor={backgroundColor}
        variant="circle"
        icon="close"
        size="s"
        onClick={closeDrawer}
        testID="DrawerCloseButton"
      />
    </Space>
  );
};
