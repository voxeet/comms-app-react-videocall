import {
  useConference,
  useTheme,
  Space,
  ConferenceName,
  CopyConferenceLinkButton,
  ShareStatus,
  useScreenSharing,
} from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import React, { useMemo } from 'react';

import Text from '../Text';

import styles from './OneParticipant.module.scss';

export const OneParticipant = () => {
  const { status, isLocalUserPresentationOwner, isPresentationModeActive } = useScreenSharing();
  const { getColor, isMobileSmall, isLandscape, isMobile, isTablet, isDesktop } = useTheme();
  const { conference } = useConference();

  const isTabletPortrait = useMemo(() => isTablet && !isLandscape, [isTablet, isLandscape]);

  const isPresentationActive =
    status === ShareStatus.Active || (isLocalUserPresentationOwner && isPresentationModeActive);

  const getLeftContainerMargin = useMemo(() => {
    if (isDesktop) return 'm';
    if (isTablet && isLandscape) return 's';
    return undefined;
  }, [isTablet, isDesktop, isLandscape]);

  if (conference) {
    return (
      <Space
        testID="OneParticipant"
        ml={isPresentationActive ? undefined : getLeftContainerMargin}
        mb={isPresentationActive && isDesktop ? 'xs' : undefined}
        p={!isMobile ? 'm' : undefined}
        fh
        fw={isPresentationActive}
        className={cx(styles.wrapper, {
          [styles.columnAlignMobile]: (isMobile && !isLandscape) || isMobileSmall || isTabletPortrait,
          [styles.tabletAlignment]: isTabletPortrait,
        })}
        style={
          (isTablet && isLandscape) || isDesktop ? { backgroundColor: getColor('grey.800') } : { paddingLeft: '24px' }
        }
      >
        <Space>
          <Space mb="xs">
            <Text testID="Alone" type={isMobile ? 'h6' : 'H2'} id="alone" />
          </Space>
          <Space mb="s">
            <Text testID="Invite" id="invite" type={isMobile ? 'bodySmall' : 'bodyDefault'} />
          </Space>
          {!isMobileSmall && (
            <>
              <Text testID="CallTitleId" type="H4" id="callTitleId" style={{ display: 'block' }} />
              <Space mb="s">
                <Space mb="s">
                  <Space>
                    <ConferenceName type="bodySmall" testID="ConferenceName" />
                  </Space>
                </Space>
              </Space>
              <CopyConferenceLinkButton
                url={window.location.href}
                size="m"
                testID="ShareLinkButton"
                icon="copy"
                backgroundColor="grey.600"
              >
                <Text type="captionSmallDemiBold" id={isDesktop ? 'copyLinkShort' : 'shareLinkShort'} />
              </CopyConferenceLinkButton>
            </>
          )}
        </Space>
      </Space>
    );
  }
  return null;
};
