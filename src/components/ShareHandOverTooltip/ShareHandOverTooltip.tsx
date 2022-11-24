import Text from '@components/Text';
import { useTheme, Space, Avatar, Button } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

import styles from './ShareHandOverTooltip.module.scss';

export type ShareTakeOverTooltipContentProps = {
  requester?: string;
  cancel: () => void;
  accept: () => void;
};

const ShareHandOverTooltip = ({ cancel, accept, requester }: ShareTakeOverTooltipContentProps) => {
  const { getColor } = useTheme();
  const intl = useIntl();

  return (
    <>
      <Space className={styles.infoSection} mb="s">
        <Space mr="xs">
          <Avatar size="s" participant={requester} />
        </Space>
        <Text className={styles.text}>
          <Text type="paragraphMedium">{requester}</Text>
          {intl.formatMessage({ id: 'handoverTooltipDesc' })}
        </Text>
      </Space>
      <Space className={styles.buttonSection}>
        <Button
          size="s"
          variant="secondary"
          className={styles.button}
          style={{ backgroundColor: getColor('grey.800') }}
          onClick={cancel}
          danger
        >
          {intl.formatMessage({ id: 'decline' })}
        </Button>
        <Space className={styles.spacer} />
        <Button size="s" variant="primary" className={styles.button} onClick={accept}>
          {intl.formatMessage({ id: 'allow' })}
        </Button>
      </Space>
    </>
  );
};

export default ShareHandOverTooltip;
