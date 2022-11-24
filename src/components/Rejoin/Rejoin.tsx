import { RejoinConferenceButton, Space, Overlay, Spinner } from '@dolbyio/comms-uikit-react';
import useConferenceCreate from '@hooks/useConferenceCreate';
import { Routes } from '@src/types/routes';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import styles from './Rejoin.module.scss';

export const Rejoin = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { meetingName } = useConferenceCreate();
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = () => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get('id')) {
      params.append('id', meetingName);
    }
    navigate(`${Routes.Conference}?${params.toString()}`, { replace: true });
  };

  return (
    <Space mt="m">
      <Overlay visible={isLoading} opacity={1}>
        <Spinner textContent={intl.formatMessage({ id: 'joiningMeeting' })} />
      </Overlay>
      <RejoinConferenceButton
        className={styles.button}
        onStart={setIsLoading}
        onSuccess={onSuccess}
        text={intl.formatMessage({ id: 'rejoin' })}
        testID="RejoinButton"
      />
    </Space>
  );
};
