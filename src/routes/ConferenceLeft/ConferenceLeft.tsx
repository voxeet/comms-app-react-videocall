import { Layout, Space } from '@dolbyio/comms-uikit-react';
import React from 'react';

import Rejoin from '../../components/Rejoin';
import ReturnToHome from '../../components/ReturnToHome';
import Text from '../../components/Text';

import styles from './ConferenceLeft.module.scss';

export const ConferenceLeft = () => {
  return (
    <Layout testID="ConferenceLeftRoute">
      <Space className={styles.wrapper}>
        <Space className={styles.container}>
          <Text type="H0" align="center" id="conferenceLeft" />
          <ReturnToHome />
          <Rejoin />
        </Space>
      </Space>
    </Layout>
  );
};
