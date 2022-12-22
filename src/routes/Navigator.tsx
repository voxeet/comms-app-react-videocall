import { useConference } from '@dolbyio/comms-uikit-react';
import useConferenceCreate from '@hooks/useConferenceCreate';
import Conference from '@src/routes/Conference';
import ConferenceCreate from '@src/routes/ConferenceCreate';
import ConferenceLeft from '@src/routes/ConferenceLeft';
import { Routes as RoutesType } from '@src/types/routes';
import React, { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Router = () => {
  const { conference } = useConference();
  const { meetingName } = useConferenceCreate();

  const redirect = useMemo(() => {
    return <Navigate replace to={`${RoutesType.ConferenceCreate}${window.location.search}`} />;
  }, [window.location.search]);

  const isConference = conference ? <Conference /> : redirect;
  const hasLeft = meetingName.length > 0 ? <ConferenceLeft /> : redirect;

  return (
    <Routes>
      <Route path={RoutesType.Conference} element={isConference}>
        <Route path=":id" element={isConference} />
      </Route>
      <Route path={RoutesType.ConferenceCreate} element={<ConferenceCreate />} />
      <Route path={RoutesType.ConferenceLeft} element={hasLeft} />
      <Route path="*" element={redirect} />
    </Routes>
  );
};

export const Navigator = () => {
  return <Router />;
};
