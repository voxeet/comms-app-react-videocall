import { useParticipants, IconButton, Space, ParticipantsList, useTheme } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

import useDrawer from '../../hooks/useDrawer';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader } from '../Drawer';

import styles from './ParticipantsDrawer.module.scss';

const ParticipantsDrawer = () => {
  const intl = useIntl();
  const { closeDrawer } = useDrawer();
  const { participants } = useParticipants();
  const { isDesktop, isMobile, isMobileSmall } = useTheme();

  const isSmartphone = isMobile || isMobileSmall;

  return (
    <Drawer backdrop={!isDesktop} testID="ParticipantsDrawer">
      <DrawerHeader
        title={`Participants (${participants.length})`}
        color="grey.100"
        borderColor="transparent"
        height={isSmartphone ? 48 : 110}
        closeButtonBackgroundColor="grey.500"
        closeButtonOutsideColor="grey.900"
        closeButtonIconColor="white"
        closeButtonStrokeColor="transparent"
        mobileCloseButtonColor="white"
      />
      <DrawerContent>
        <ParticipantsList
          localText={intl.formatMessage({ id: 'you' })}
          muteText={intl.formatMessage({ id: 'mute' })}
          unmuteText={intl.formatMessage({ id: 'unmute' })}
          soundOnText={intl.formatMessage({ id: 'soundOn' })}
          soundOffText={intl.formatMessage({ id: 'soundOff' })}
        />
      </DrawerContent>
      {isDesktop && (
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
      )}
    </Drawer>
  );
};

export default ParticipantsDrawer;
