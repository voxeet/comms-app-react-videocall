import {
  useConference,
  useParticipants,
  IconButton,
  Space,
  LocalToggleAudioButton,
  LocalToggleVideoButton,
  ConferenceName,
} from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

import useDrawer from '../../hooks/useDrawer';
import Copy from '../Copy';
import LeaveConference from '../LeaveConference';

import styles from './ActionBar.module.scss';

export const ActionBar = () => {
  const { openDrawer } = useDrawer();
  const { conference } = useConference();
  const { participants } = useParticipants();
  const intl = useIntl();

  if (conference === null) {
    return null;
  }

  return (
    <Space testID="ActionBar" className={styles.actionBar}>
      <Space className={styles.row} style={{ width: 330 }}>
        <Copy />
        <Space style={{ flex: 1 }}>
          <ConferenceName testID="ConferenceName" />
        </Space>
      </Space>
      <Space className={styles.row}>
        <LocalToggleAudioButton
          activeTooltipText={intl.formatMessage({ id: 'mute' })}
          inactiveTooltipText={intl.formatMessage({ id: 'unmute' })}
        />
        <Space className={styles.spacer} />
        <LocalToggleVideoButton
          activeTooltipText={intl.formatMessage({ id: 'cameraOff' })}
          inactiveTooltipText={intl.formatMessage({ id: 'cameraOn' })}
        />
        <Space className={styles.spacer} />
        <LeaveConference />
      </Space>
      <Space className={styles.row} style={{ width: 330, justifyContent: 'flex-end' }}>
        <IconButton
          testID="OpenDrawerButton"
          icon="participants"
          backgroundColor="transparent"
          badge={participants.length}
          onClick={openDrawer}
        />
      </Space>
    </Space>
  );
};
