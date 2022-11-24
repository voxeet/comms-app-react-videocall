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

  const homeScreen = () => {
    resetVideo();
    resetAudio();
    setStep(CreateStep.meetingName);
    navigate(`${Routes.ConferenceCreate}${window.location.search}`);
  };

  return (
    <Space mt="l">
      <Button onClick={homeScreen} testID="ReturnToHomeButton" variant="primary" className={styles.button}>
        <Text type="button" id="returnToHome" />
      </Button>
    </Space>
  );
};
