/* eslint-disable no-param-reassign */
import {
  useConference,
  IconButton,
  Space,
  ConferenceName,
  useTheme,
  useCamera,
  useAudio,
} from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import React from 'react';

import Timer from '../Timer';

import styles from './MobileTopActionBar.module.scss';

export const MobileTopActionBar = () => {
  const { conference } = useConference();
  const { isMobile, isMobileSmall, isTablet } = useTheme();
  const { swapCamera } = useCamera();
  const { toggleMuteParticipants, isPageMuted } = useAudio();

  const reverseCamera = async () => {
    await swapCamera();
  };

  const isSmartphone = isMobile || isMobileSmall;

  if (conference === null) {
    return null;
  }

  return (
    <Space
      testID="MobileTopActionBar"
      className={cx(styles.actionBar, { [styles.mobile]: isSmartphone, [styles.tablet]: isTablet })}
      pv={isSmartphone ? 's' : 'm'}
      ph={isSmartphone ? 's' : 'm'}
    >
      <Space className={styles.leftSection}>
        <IconButton icon="cameraReverse" onClick={reverseCamera} />
      </Space>
      <Space className={styles.middleSection}>
        <Space>
          <ConferenceName type="h6" />
        </Space>
        <Space>
          <Timer />
        </Space>
      </Space>
      <Space className={styles.rightSection}>
        <IconButton icon={isPageMuted ? 'speakerOff' : 'speaker'} onClick={toggleMuteParticipants} />
      </Space>
    </Space>
  );
};
