import Rejoin from '@components/Rejoin';
import ReturnToHome from '@components/ReturnToHome';
import Text from '@components/Text';
import { Layout, Space, useTheme } from '@dolbyio/comms-uikit-react';
import useConferenceCleanup from '@hooks/useConferenceCleanup';
import { DemoEndedScreen } from '@src/components/DemoEndedScreen/DemoEndedScreen';
import { ungatedFeaturesEnabled } from '@src/utils/env';
import cx from 'classnames';

import styles from './ConferenceLeft.module.scss';

export const ConferenceLeft = () => {
  useConferenceCleanup();
  const { isMobile, isMobileSmall, isLandscape } = useTheme();
  const isSmartphone = isMobile || isMobileSmall;

  return (
    <Layout testID="ConferenceLeftRoute">
      <Space fw className={styles.wrapper}>
        <Space className={cx(styles.textContainer, isSmartphone && styles.smartphone, isLandscape && styles.landscape)}>
          <Text type={isSmartphone ? 'H1' : 'H0'} align="center" labelKey="conferenceLeft" />
        </Space>
        {ungatedFeaturesEnabled() ? (
          <Space>
            <DemoEndedScreen />
          </Space>
        ) : (
          <>
            <ReturnToHome />
            <Rejoin />
          </>
        )}
      </Space>
    </Layout>
  );
};
