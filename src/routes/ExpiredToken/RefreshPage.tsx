import Text from '@components/Text';
import { Button, Overlay, Space } from '@dolbyio/comms-uikit-react';
import useConferenceCleanup from '@hooks/useConferenceCleanup';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import styles from './RefreshPage.module.scss';

export const RefreshPage = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  useConferenceCleanup();
  return (
    <Overlay testID="ExpiredToken" opacity={0.94}>
      <Space className={styles.fallbackContainer}>
        <Space mb="m">
          <Text labelKey="refreshDsc" />
        </Space>
        <Button
          type="button"
          onClick={() => {
            navigate(0);
          }}
        >
          {intl.formatMessage({ id: 'refreshPage' })}
        </Button>
      </Space>
    </Overlay>
  );
};
