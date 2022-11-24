import { ConferenceCreateContext } from '@context/ConferenceCreateContext';
import { CreateStep } from '@src/types/routes';
import { useContext } from 'react';

const useConferenceCreate = (type?: 'user' | 'meeting') => {
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
    setValue: type === 'user' ? setUsername : setMeetingName,
  };
};

export default useConferenceCreate;
