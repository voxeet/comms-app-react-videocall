import { Button, useAudio, useVideo, Space } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import useConferenceCreate from '../../hooks/useConferenceCreate';
import { CreateStep, Routes } from '../../types/routes.types';
import Text from '../Text';

import styles from './ReturnToHome.module.scss';

export const ReturnToHome = () => {
  const { setStep } = useConferenceCreate();
  const navigate = useNavigate();
  const { resetVideo } = useVideo();
  const { resetAudio } = useAudio();

  const homeScreen = () => {
    resetVideo();
    resetAudio();
    setStep(CreateStep.meetingName);
    navigate(Routes.ConferenceCreate);
  };

  return (
    <Space mt="l">
      <Button onClick={homeScreen} testID="ReturnToHomeButton" variant="primary" className={styles.button}>
        <Text type="button" id="returnToHome" />
      </Button>
    </Space>
  );
};
