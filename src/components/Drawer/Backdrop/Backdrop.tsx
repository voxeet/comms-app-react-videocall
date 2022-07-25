/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useTheme, Space } from '@dolbyio/comms-uikit-react';
import React from 'react';

import useDrawer from '../../../hooks/useDrawer';

import styles from './Backdrop.module.scss';

type BackdropProps = {
  visible?: boolean;
};

export const Backdrop = ({ visible }: BackdropProps) => {
  const { isDrawerOpen, closeDrawer } = useDrawer();
  const { getColor } = useTheme();
  if (isDrawerOpen && visible) {
    return (
      <Space
        testID="Backdrop"
        role="dialog"
        className={styles.backdrop}
        onClick={closeDrawer}
        style={{ backgroundColor: getColor('blackAlpha.400') }}
      />
    );
  }
  return null;
};
