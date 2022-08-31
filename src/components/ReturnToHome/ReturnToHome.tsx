import { Button, useAudio, useVideo, Space, useTheme } from '@dolbyio/comms-uikit-react';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import useConferenceCreate from '../../hooks/useConferenceCreate';
import { CreateStep, Routes } from '../../types/routes.types';
import Text from '../Text';

export const ReturnToHome = () => {
  const { setStep } = useConferenceCreate();
  const navigate = useNavigate();
  const { resetVideo } = useVideo();
  const { resetAudio } = useAudio();

  const { isMobile, isMobileSmall } = useTheme();

  const isSmartphone = isMobile || isMobileSmall;

  const homeScreen = () => {
    resetVideo();
    resetAudio();
    setStep(CreateStep.meetingName);
    navigate(Routes.ConferenceCreate);
  };

  const customStyles = useMemo(() => {
    const styles = {
      width: isSmartphone ? 275 : 400,
      height: isSmartphone ? 44 : 56,
    };

    return styles;
  }, [isSmartphone]);

  return (
    <Space mt="l">
      <Button onClick={homeScreen} testID="ReturnToHomeButton" variant="primary" style={customStyles}>
        <Text type="buttonDefault" id="returnToHome" />
      </Button>
    </Space>
  );
};
