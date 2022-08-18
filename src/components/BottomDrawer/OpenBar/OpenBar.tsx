import { Space, useTheme } from '@dolbyio/comms-uikit-react';
import React from 'react';

import styles from './OpenBar.module.scss';

type OpenBarProps = {
  onClick: () => void;
};

const OpenBar = ({ onClick }: OpenBarProps) => {
  const { getColor } = useTheme();

  return <Space onClick={onClick} className={styles.bar} style={{ backgroundColor: getColor('grey.100') }} />;
};

export default OpenBar;
