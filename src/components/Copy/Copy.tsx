import { CopyConferenceLinkButton, useConference } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

export const Copy = () => {
  const intl = useIntl();
  const { conference } = useConference();

  if (!conference) return null;

  return (
    <CopyConferenceLinkButton
      tooltipText={intl.formatMessage({ id: 'copyLink' })}
      successText={intl.formatMessage({ id: 'success' })}
      url={window.location.href}
    />
  );
};
