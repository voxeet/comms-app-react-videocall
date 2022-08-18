import { Space, IconButton, useTheme, useParticipants, CopyConferenceLinkButton } from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import React from 'react';

import useDrawer from '../../hooks/useDrawer';
import Text from '../Text';

import styles from './BottomDrawer.module.scss';

type BottomDrawerProps = {
  close: () => void;
};

const BottomDrawer = ({ close }: BottomDrawerProps) => {
  const { isTablet, isPortrait } = useTheme();
  const { participants } = useParticipants();
  const { openDrawer } = useDrawer();

  const openParticipantsList = () => {
    openDrawer();
    close();
  };

  return (
    <Space className={cx(styles.drawer, !isTablet && isPortrait && styles.smartphones)}>
      <Space className={styles.close}>
        <IconButton size="s" icon="close" onClick={close} backgroundColor="transparent" />
      </Space>
      <Space mr={!isTablet ? 's' : undefined} mt="xxxl" className={styles.buttonContainer}>
        <CopyConferenceLinkButton
          url={window.location.href}
          size="m"
          testID="ShareLinkButton"
          icon="invite"
          backgroundColor="grey.600"
        />
        <Text type="captionSmallDemiBold" id="inviteLabel" />
      </Space>
      {!isTablet && (
        <Space ml="s" mt="xxxl" className={styles.buttonContainer}>
          <IconButton
            testID="OpenDrawerButton"
            icon="participants"
            badge={participants.length}
            onClick={openParticipantsList}
            rightBadge
            backgroundColor="grey.600"
            badgeColor="grey.300"
          />
          <Text type="captionSmallDemiBold" id="participantsLabel" />
        </Space>
      )}
    </Space>
  );
};

export default BottomDrawer;
