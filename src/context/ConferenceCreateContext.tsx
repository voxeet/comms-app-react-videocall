import React, { useState, createContext, useMemo } from 'react';

import { CreateStep } from '../types/routes.types';

type ConferenceCreateContext = {
  step: CreateStep;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  meetingName: string;
  setMeetingName: React.Dispatch<React.SetStateAction<string>>;
};

type ConferenceCreateProviderProps = { children: React.ReactNode };

export const ConferenceCreateContext = createContext<ConferenceCreateContext>({} as ConferenceCreateContext);

export const ConferenceCreateProvider = ({ children }: ConferenceCreateProviderProps) => {
  const [step, setStep] = useState(CreateStep.username);
  const [username, setUsername] = useState('');
  const [meetingName, setMeetingName] = useState('');

  const contextValue: ConferenceCreateContext = useMemo(
    () => ({
      step,
      setStep,
      username,
      setUsername,
      meetingName,
      setMeetingName,
    }),
    [step, username, meetingName],
  );

  return <ConferenceCreateContext.Provider value={contextValue}>{children}</ConferenceCreateContext.Provider>;
};
