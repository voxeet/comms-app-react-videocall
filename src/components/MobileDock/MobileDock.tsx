import LeaveConference from '@components/LeaveConference';
import { SideDrawerContentTypes } from '@context/SideDrawerContext';
import {
  useConference,
  useParticipants,
  IconButton,
  Space,
  LocalToggleAudioButton,
  LocalToggleVideoButton,
  useTheme,
} from '@dolbyio/comms-uikit-react';
import useDrawer from '@hooks/useDrawer';
import cx from 'classnames';
import React from 'react';

import styles from './MobileDock.module.scss';

type MobileDockProps = {
  openBottomDrawer: () => void;
  visible?: boolean;
};

export const MobileDock = ({ openBottomDrawer, visible = true }: MobileDockProps) => {
  const { openDrawer } = useDrawer();
  const { conference } = useConference();
  const { participants } = useParticipants();
  const { isMobile, isMobileSmall, isTablet } = useTheme();

  if (conference === null) {
    return null;
  }

  const openParticipantsDrawer = () => {
    openDrawer(SideDrawerContentTypes.PARTICIPANTS);
  };

  const isSmartphone = isMobile || isMobileSmall;

  return (
    <Space
      testID="MobileDock"
      className={cx(styles.dock, {
        [styles.hidden]: !visible,
        [styles.visible]: visible,
      })}
      pv={isSmartphone ? 's' : 'm'}
      ph={isSmartphone ? 's' : 'm'}
    >
      <Space mh="xs">
        <LeaveConference />
      </Space>
      <Space mh="xs">
        <LocalToggleAudioButton />
      </Space>
      <Space mh="xs">
        <LocalToggleVideoButton />
      </Space>
      {(isMobile || isTablet) && (
        <Space mh="xs">
          <IconButton
            testID="OpenDrawerButton"
            icon="participants"
            badge={participants.length}
            onClick={openParticipantsDrawer}
            rightBadge
            badgeColor="grey.300"
          />
        </Space>
      )}

      <Space mh="xs">
        <IconButton testID="OpenOptionsButton" icon="dotsVertical" onClick={openBottomDrawer} />
      </Space>
    </Space>
  );
};
