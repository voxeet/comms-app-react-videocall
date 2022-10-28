/* eslint-disable no-nested-ternary */
import {
  RecordingActionBar,
  ScreenSharingActionBar,
  Space,
  useRecording,
  useScreenSharing,
  useTheme,
  GenericStatus,
  useNotifications,
} from '@dolbyio/comms-uikit-react';
import React, { forwardRef, useState } from 'react';
import { useIntl } from 'react-intl';

import Text from '../Text';
import Timer from '../Timer';

type ActionBarProps = {
  mobileShare?: boolean;
};

export const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(({ mobileShare }, ref) => {
  const { isDesktop, isMobile, isMobileSmall, isTablet } = useTheme();
  const intl = useIntl();
  const [activeBar, setActiveBar] = useState('presenting');
  const { showSuccessNotification } = useNotifications();
  const { owner, isPresentationModeActive, status: sharingStatus, isLocalUserPresentationOwner } = useScreenSharing();
  const { isLocalUserRecordingOwner, isRecordingModeActive, status: recordingStatus } = useRecording();

  if (
    !isLocalUserPresentationOwner &&
    !isLocalUserRecordingOwner &&
    sharingStatus !== GenericStatus.Active &&
    recordingStatus !== GenericStatus.Active
  ) {
    return null;
  }

  return (
    <div className="actionBarRef" ref={ref}>
      <Space
        ph={isDesktop ? 'm' : !mobileShare ? (isTablet ? 'm' : 'xs') : undefined}
        pt={isMobile || isMobileSmall ? 'xs' : isDesktop ? 'm' : undefined}
        pb={!isDesktop && !isMobileSmall && !mobileShare ? 'xs' : undefined}
        style={{ display: 'flex' }}
      >
        {(isLocalUserRecordingOwner || recordingStatus === GenericStatus.Active) && !mobileShare && (
          <RecordingActionBar
            onClick={() => setActiveBar('recording')}
            compact={activeBar !== 'recording' && isPresentationModeActive}
            statusLabels={{
              active: (
                <>
                  <Timer />
                  <Text> | </Text>
                  <Text id="recording" />
                </>
              ),
              error: intl.formatMessage({ id: 'recordingFailed' }),
              loading: `${intl.formatMessage({ id: 'recording' })}...`,
              other: '',
            }}
            buttonLabels={{
              active: {
                tooltip: intl.formatMessage({ id: 'stopRecording' }),
                label: intl.formatMessage({ id: !isDesktop ? 'stop' : 'stopRecording' }),
              },
              error: {
                tooltip: intl.formatMessage({ id: 'tryAgain' }),
                label: intl.formatMessage({ id: 'tryAgain' }),
              },
            }}
            onActionSuccess={() => {
              if (recordingStatus === GenericStatus.Active) {
                showSuccessNotification(intl.formatMessage({ id: 'recordingStopped' }));
              }
              if (recordingStatus === GenericStatus.Error) {
                showSuccessNotification(intl.formatMessage({ id: 'recordingSuccessfully' }));
              }
            }}
          />
        )}
        {(isDesktop || mobileShare) && (isPresentationModeActive || sharingStatus === GenericStatus.Active) && (
          <>
            {(isLocalUserRecordingOwner || recordingStatus === GenericStatus.Active) && !mobileShare && (
              <Space mh="xxs" />
            )}
            <ScreenSharingActionBar
              onClick={() => setActiveBar('presenting')}
              compact={activeBar !== 'presenting' && isRecordingModeActive}
              statusLabels={{
                active: intl.formatMessage({ id: 'screenSharing' }),
                error: intl.formatMessage({ id: 'screenSharingIssue' }),
                loading: `${intl.formatMessage({ id: 'screenSharing' })}...`,
                other: '',
              }}
              buttonLabels={{
                tooltip: intl.formatMessage({ id: 'stopPresenting' }),
                label: intl.formatMessage({ id: 'stopPresenting' }),
              }}
              onActionSuccess={() => {
                showSuccessNotification(intl.formatMessage({ id: 'screenSharingStopped' }));
              }}
              guestLabel={intl.formatMessage({ id: 'isPresenting' }, { participant: owner?.info.name })}
            />
          </>
        )}
      </Space>
    </div>
  );
});
