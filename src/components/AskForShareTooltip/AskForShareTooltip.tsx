import Text from '@components/Text';
import { useTheme, Space, Button } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

import styles from './AskForShareTooltip.module.scss';

export type AskForShareTooltipProps = {
  cancel: () => void;
  accept: () => void;
};

const AskForShareTooltip = ({ cancel, accept }: AskForShareTooltipProps) => {
  const { getColor } = useTheme();
  const intl = useIntl();

  return (
    <>
      <Space className={styles.textSection} mb="s">
        <Text id="startSharingConfirmation" />
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
          {intl.formatMessage({ id: 'cancel' }).toUpperCase()}
        </Button>
        <Space className={styles.spacer} />
        <Button size="s" variant="primary" className={styles.button} onClick={accept}>
          {intl.formatMessage({ id: 'accept' }).toUpperCase()}
        </Button>
      </Space>
    </>
  );
};

export default AskForShareTooltip;
