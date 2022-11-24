import Text from '@components/Text';
import Version from '@components/Version';
import { Space, useTheme } from '@dolbyio/comms-uikit-react';
import React, { useMemo } from 'react';

import styles from './ConferenceCreateFooter.module.scss';

export const footerSizes = {
  small: 32,
  medium: 48,
};

export const ConferenceCreateFooter = () => {
  const { isMobile, isMobileSmall, isTablet, isDesktop, isLandscape } = useTheme();

  const footerHeight = useMemo(() => {
    let value = footerSizes.medium;

    if (isDesktop || isTablet) {
      value = footerSizes.medium;
    } else if (isMobile || isMobileSmall) {
      value = footerSizes.small;
    }

    return value;
  }, [isMobile, isMobileSmall, isTablet, isDesktop, isLandscape]);

  return (
    <Space fw testID="ConferenceCreateFooter" className={styles.container} style={{ height: footerHeight }}>
      <Text type="captionRegular" color="grey.300" id="copyright" values={{ year: new Date().getFullYear() }} />
      <Space className={styles.version}>
        <Version />
      </Space>
    </Space>
  );
};
