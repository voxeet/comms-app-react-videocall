import Text from '@components/Text';
import { ColorKey, Space, useTheme } from '@dolbyio/comms-uikit-react';
import React from 'react';

import styles from './PhoneLandscapeCurtain.module.scss';

export type AndroidRotationCurtainProps = React.HTMLAttributes<HTMLDivElement> & {
  backgroundColor?: ColorKey;
};

export const PhoneLandscapeCurtain = ({ backgroundColor }: AndroidRotationCurtainProps) => {
  const { isMobile, isMobileSmall, getColor } = useTheme();
  const isPhoneDevice = isMobile || isMobileSmall;

  return isPhoneDevice ? (
    <Space className={styles.rotationCurtain} style={{ backgroundColor: getColor(backgroundColor, 'background') }}>
      <Text className={styles.description} type="H1" id="pleaseRotateYourPhone" />
    </Space>
  ) : null;
};
