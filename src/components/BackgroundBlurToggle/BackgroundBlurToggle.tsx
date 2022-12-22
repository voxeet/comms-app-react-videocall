import Switch from '@components/Switch';
import { Icon, Space, Tooltip, useBlur, useTheme, useVideo } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

import styles from './BackgroundBlurToggle.module.scss';

export const BackgroundBlurToggle = () => {
  const { getColor, borderRadius } = useTheme();
  const intl = useIntl();
  const { startBackgroundBlur, stopVideoProcessing, isBlurred } = useBlur();
  const { isVideo } = useVideo();

  const handleBlur = () => {
    if (isVideo) {
      if (!isBlurred) {
        startBackgroundBlur();
      } else {
        stopVideoProcessing();
      }
    }
  };
  // background blur is supported only on DESKTOP Chrome and Edge
  if (
    (navigator.userAgent.match(/chrome|chromium/i) || navigator.userAgent.match(/edg/i)) &&
    navigator.userAgent.indexOf('Mobile') === -1
  ) {
    return (
      <>
        <Tooltip
          text={intl.formatMessage({ id: 'backgroundBlur' })}
          css={{ pointerEvents: isVideo ? undefined : 'none', opacity: isVideo ? 1 : 0.6 }}
        >
          <Space
            p="xs"
            onClick={handleBlur}
            className={styles.row}
            css={{
              borderRadius,
              '&:hover': { backgroundColor: getColor('grey.700') },
            }}
          >
            <Space mr="xs">
              <Icon name="backgroundBlur" testID="BackgroundBlurIcon" />
            </Space>
            <Switch isActive={isBlurred} testID="BackgroundBlurSwitch" />
          </Space>
        </Tooltip>
        <Space mh="xs" className={styles.separator} style={{ backgroundColor: getColor('grey.700') }} />
      </>
    );
  }

  return null;
};
