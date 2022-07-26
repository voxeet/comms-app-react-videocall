import { useContext } from 'react';

import { ConferenceCreateContext } from '../context/ConferenceCreateContext';
import { CreateStep } from '../types/routes.types';

const useConferenceCreate = () => {
  const { step, setStep, accessToken, setAccessToken, username, setUsername, meetingName, setMeetingName } = useContext(ConferenceCreateContext);

  const nextStep = () => {
    if (step !== CreateStep.deviceSetup) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step !== CreateStep.accessToken) {
      setStep(step - 1);
    }
  };

  return {
    step,
    setStep,
    accessToken,
    setAccessToken,
    username,
    setUsername,
    meetingName,
    setMeetingName,
    nextStep,
    prevStep,
  };
};

export default useConferenceCreate;
