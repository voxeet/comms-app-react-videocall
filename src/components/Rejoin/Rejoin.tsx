import { RejoinConferenceButton, Space, useTheme } from '@dolbyio/comms-uikit-react';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import useConferenceCreate from '../../hooks/useConferenceCreate';
import { Routes } from '../../types/routes.types';
import OverlaySpinner from '../OverlaySpinner';

import styles from './Rejoin.module.scss';

export const Rejoin = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { meetingName } = useConferenceCreate();
  const [isLoading, setIsLoading] = useState(false);
  const { isMobile, isMobileSmall, getColor } = useTheme();

  const onSuccess = () => {
    navigate(`${Routes.Conference}?id=${encodeURIComponent(meetingName)}`, { replace: true });
  };

  return (
    <Space mt="m">
      {isLoading && <OverlaySpinner textID="joiningMeeting" />}
      <RejoinConferenceButton
        style={{ borderColor: isMobile || isMobileSmall ? getColor('white') : getColor('primary.500') }}
        className={styles.button}
        onStart={setIsLoading}
        onSuccess={onSuccess}
        text={intl.formatMessage({ id: 'rejoin' })}
        testID="RejoinButton"
      />
    </Space>
  );
};
