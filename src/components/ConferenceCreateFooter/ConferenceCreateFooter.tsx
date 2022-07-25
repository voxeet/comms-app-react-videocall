import { Space } from '@dolbyio/comms-uikit-react';
import React from 'react';

import Text from '../Text';

import styles from './ConferenceCreateFooter.module.scss';

export const ConferenceCreateFooter = () => {
  return (
    <Space testID="ConferenceCreateFooter" className={styles.container}>
      <Text type="captionRegular" color="grey.300" id="copyright" values={{ year: new Date().getFullYear() }} />
    </Space>
  );
};
