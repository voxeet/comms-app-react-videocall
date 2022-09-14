import {
  useConference,
  useParticipants,
  IconButton,
  Space,
  LocalToggleAudioButton,
  LocalToggleVideoButton,
  useTheme,
} from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import React from 'react';

import useDrawer from '../../hooks/useDrawer';
import LeaveConference from '../LeaveConference';

import styles from './MobileBottomActionBar.module.scss';

type MobileBottomActionBarProps = {
  openBottomDrawer: () => void;
};

export const MobileBottomActionBar = ({ openBottomDrawer }: MobileBottomActionBarProps) => {
  const { openDrawer } = useDrawer();
  const { conference } = useConference();
  const { participants } = useParticipants();
  const { isMobile, isMobileSmall, isTablet } = useTheme();

  if (conference === null) {
    return null;
  }

  const isSmartphone = isMobile || isMobileSmall;

  return (
    <Space
      testID="MobileBottomActionBar"
      className={cx(styles.actionBar, { [styles.mobileSmall]: isMobileSmall, [styles.tablet]: isTablet })}
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
            onClick={openDrawer}
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
