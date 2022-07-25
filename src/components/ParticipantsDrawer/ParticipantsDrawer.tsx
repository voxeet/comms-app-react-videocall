import { useParticipants, IconButton, Space, ParticipantsList } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

import useDrawer from '../../hooks/useDrawer';
import { Drawer, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader } from '../Drawer';

import styles from './ParticipantsDrawer.module.scss';

const ParticipantsDrawer = () => {
  const intl = useIntl();
  const { closeDrawer } = useDrawer();
  const { participants } = useParticipants();

  return (
    <Drawer testID="ParticipantsDrawer">
      <DrawerCloseButton />
      <DrawerHeader title={`Participants (${participants.length})`} color="grey.100" />
      <DrawerContent>
        <ParticipantsList
          localText={intl.formatMessage({ id: 'you' })}
          muteText={intl.formatMessage({ id: 'mute' })}
          unmuteText={intl.formatMessage({ id: 'unmute' })}
          soundOnText={intl.formatMessage({ id: 'soundOn' })}
          soundOffText={intl.formatMessage({ id: 'soundOff' })}
        />
      </DrawerContent>
      <DrawerFooter>
        <Space className={styles.closeButtonBottom}>
          <IconButton
            testID="CloseParticipantsDrawerButton"
            badge
            backgroundColor="transparent"
            badgeColor="primary.300"
            icon="participants"
            onClick={closeDrawer}
          />
        </Space>
      </DrawerFooter>
    </Drawer>
  );
};

export default ParticipantsDrawer;
