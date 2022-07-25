import { Space, useSession } from '@dolbyio/comms-uikit-react';
import React from 'react';

import packageJson from '../../../package.json';
import Text from '../Text';

import styles from './Version.module.scss';

export const Version = () => {
  const { getSDKVersion } = useSession();
  return (
    <Space testID="AppVersion" className={styles.version}>
      <Text type="captionSmallRegular" color="grey.300" id="version" values={{ v: packageJson.version }} />
      <Text type="captionSmallRegular" color="grey.300" id="sdk" values={{ v: getSDKVersion() }} />
    </Space>
  );
};
