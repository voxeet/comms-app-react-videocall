import { Button, Icon, useConference, useTheme, Space, ConferenceName } from '@dolbyio/comms-uikit-react';
import React from 'react';

import { copyTextToClipboard } from '../../utils/copyTextToClipboard.util';
import Text from '../Text';

import styles from './OneParticipant.module.scss';

export const OneParticipant = () => {
  const { getColor } = useTheme();
  const { conference } = useConference();
  if (conference) {
    const copy = () => {
      copyTextToClipboard(window.location.href);
    };
    return (
      <Space
        testID="OneParticipant"
        ml="m"
        p="m"
        fh
        className={styles.wrapper}
        style={{ backgroundColor: getColor('grey.800') }}
      >
        <Space>
          <Space mb="xs">
            <Text testID="Alone" type="H2" id="alone" />
          </Space>
          <Space mb="s">
            <Text testID="Invite" id="invite" />
          </Space>
          <Text testID="ConferenceTitleId" type="H4" id="conferenceTitleId" style={{ display: 'block' }} />
          <Space mb="s">
            <Space mb="s">
              <Space>
                <ConferenceName type="bodySmall" testID="ConferenceName" />
              </Space>
            </Space>
          </Space>
          <Button testID="CopyButton" variant="primary" onClick={copy}>
            <Space mr="xs">
              <Text type="buttonDefault" id="copyLinkShort" />
            </Space>
            <Icon name="copy" size="s" />
          </Button>
        </Space>
      </Space>
    );
  }
  return null;
};
