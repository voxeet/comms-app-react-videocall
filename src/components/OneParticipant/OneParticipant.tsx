import Text from '@components/Text';
import {
  useConference,
  useTheme,
  Space,
  CopyConferenceLinkButton,
  ShareStatus,
  useScreenSharing,
} from '@dolbyio/comms-uikit-react';
import { splitMeetingAlias } from '@src/utils/misc';
import cx from 'classnames';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import styles from './OneParticipant.module.scss';

export const OneParticipant = () => {
  const { status, isLocalUserPresentationOwner, isPresentationModeActive } = useScreenSharing();
  const { getColor, isMobileSmall, isLandscape, isMobile, isTablet, isDesktop } = useTheme();
  const { conference } = useConference();
  const intl = useIntl();

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
        ml={!isPresentationActive && getLeftContainerMargin}
        mb={isPresentationActive && isDesktop && 'xs'}
        p={!isMobile && 'm'}
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
            <Text testID="Alone" type={isMobile ? 'h6' : 'H2'} labelKey="alone" />
          </Space>
          <Space mb="s">
            <Text testID="Invite" labelKey="invite" type={isMobile ? 'bodySmall' : 'bodyDefault'} />
          </Space>
          {!isMobileSmall && (
            <>
              <Text testID="CallTitleId" type="H4" labelKey="callTitleId" style={{ display: 'block' }} />
              <Space mb="s">
                <Space mb="s">
                  <Space>
                    <Text type="h6" testID="ConferenceName">
                      {splitMeetingAlias(conference.alias)[0]}
                    </Text>
                  </Space>
                </Space>
              </Space>
              <CopyConferenceLinkButton
                url={window.location.href}
                size="m"
                testID="ShareLinkButton"
                icon="copy"
                backgroundColor="grey.600"
                successText={intl.formatMessage({ id: 'success' })}
              >
                <Text type="captionSmallDemiBold" labelKey={isDesktop ? 'copyLinkShort' : 'shareLinkShort'} />
              </CopyConferenceLinkButton>
            </>
          )}
        </Space>
      </Space>
    );
  }
  return null;
};
