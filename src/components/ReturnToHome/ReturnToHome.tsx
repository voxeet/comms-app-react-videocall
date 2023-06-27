import Text from '@components/Text';
import { Button, useAudio, useVideo, Space } from '@dolbyio/comms-uikit-react';
import useConferenceCreate from '@hooks/useConferenceCreate';
import { CreateStep, Routes } from '@src/types/routes';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ReturnToHome.module.scss';

export const ReturnToHome = () => {
  const { setStep } = useConferenceCreate();
  const navigate = useNavigate();
  const { resetVideo } = useVideo();
  const { resetAudio } = useAudio();

  const gotoHomeScreen = () => {
    resetVideo();
    resetAudio();
    setStep(CreateStep.meetingName);
    const params = new URLSearchParams(window.location.search);
    if (params.get('id')) {
      params.delete('id');
    }
    navigate(`${Routes.ConferenceCreate}?${params.toString()}`);
  };

  return (
    <Space mt="l">
      <Button onClick={gotoHomeScreen} testID="ReturnToHomeButton" variant="primary" className={styles.button}>
        <Text type="button" labelKey="returnToHome" />
      </Button>
    </Space>
  );
};
