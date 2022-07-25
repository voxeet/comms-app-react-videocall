import { useConference } from '@dolbyio/comms-uikit-react';
import React, { useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Version from '../components/Version';
import useConferenceCreate from '../hooks/useConferenceCreate';
import { Routes as RoutesType } from '../types/routes.types';

import Conference from './Conference';
import { ConferenceComponents } from './ConferenceComponents/ConferenceComponents';
import ConferenceCreate from './ConferenceCreate';
import ConferenceLeft from './ConferenceLeft';
import Home from './Home';

const Router = () => {
  const { conference } = useConference();
  const { meetingName } = useConferenceCreate();
  const location = useLocation();

  const meetingId = useMemo(() => {
    return encodeURIComponent(new URLSearchParams(window.location.search).get('id') || '');
  }, [location]);

  const redirect = <Navigate replace to={`${RoutesType.ConferenceCreate}${meetingId ? `?id=${meetingId}` : ``}`} />;

  const isConference = conference ? <Conference /> : redirect;
  const hasLeft = meetingName.length > 0 ? <ConferenceLeft /> : redirect;

  return (
    <Routes>
      <Route path={RoutesType.Conference} element={isConference}>
        <Route path=":id" element={isConference} />
      </Route>
      <Route path={RoutesType.ConferenceCreate} element={<ConferenceCreate />} />
      <Route path={RoutesType.ConferenceLeft} element={hasLeft} />
      <Route path={RoutesType.Home} element={<Home />} />
      <Route path={RoutesType.ConferenceComponents} element={<ConferenceComponents />} />
      <Route path="*" element={redirect} />
    </Routes>
  );
};

export const Navigator = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Version />
      <Router />
    </BrowserRouter>
  );
};
