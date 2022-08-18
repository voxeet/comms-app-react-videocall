/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useTheme, Space } from '@dolbyio/comms-uikit-react';
import React from 'react';

import styles from './Backdrop.module.scss';

type BackdropProps = {
  visible?: boolean;
  onClick?: () => void;
};

export const Backdrop = ({ visible, onClick }: BackdropProps) => {
  const { getColor } = useTheme();
  if (visible) {
    return (
      <Space
        testID="Backdrop"
        role="dialog"
        className={styles.backdrop}
        onClick={onClick}
        style={{ backgroundColor: getColor('rgba(0,0,0, 0.24)') }}
      />
    );
  }
  return null;
};
