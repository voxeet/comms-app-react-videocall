import { LeaveConferenceButton } from '@dolbyio/comms-uikit-react';
import { useLiveStreaming } from '@hooks/useLiveStreaming';
import { Routes } from '@src/types/routes';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const LeaveConference = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { isLocalUserLiveStreamingOwner, isLiveStreamingModeActive, streamHandler } = useLiveStreaming();

  const onSuccess = () => {
    navigate(`${Routes.ConferenceLeft}${window.location.search}`, { replace: true });
  };
  /*
    We need this pre-action to clean up ex Live streaming with proper participants message handling
   */
  const preAction = () => {
    if (isLocalUserLiveStreamingOwner && isLiveStreamingModeActive) {
      return streamHandler('stop');
    }
    return true;
  };

  return (
    <LeaveConferenceButton
      testID="LeaveConferenceButton"
      tooltipText={intl.formatMessage({ id: 'leaveCall' })}
      onSuccess={onSuccess}
      preAction={preAction}
    />
  );
};

export default LeaveConference;
