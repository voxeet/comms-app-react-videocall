import { LeaveConferenceButton } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Routes } from '../../types/routes.types';

const LeaveConference = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate(Routes.ConferenceLeft, { replace: true });
  };

  return (
    <LeaveConferenceButton
      testID="LeaveConferenceButton"
      tooltipText={intl.formatMessage({ id: 'leaveConference' })}
      onSuccess={onSuccess}
    />
  );
};

export default LeaveConference;
