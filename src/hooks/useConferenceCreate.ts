import { useContext } from 'react';

import { ConferenceCreateContext } from '../context/ConferenceCreateContext';
import { CreateStep } from '../types/routes.types';

const useConferenceCreate = () => {
  const { step, setStep, username, setUsername, meetingName, setMeetingName } = useContext(ConferenceCreateContext);

  const nextStep = () => {
    if (step !== CreateStep.deviceSetup) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step !== CreateStep.username) {
      setStep(step - 1);
    }
  };

  return {
    step,
    setStep,
    username,
    setUsername,
    meetingName,
    setMeetingName,
    nextStep,
    prevStep,
  };
};

export default useConferenceCreate;
