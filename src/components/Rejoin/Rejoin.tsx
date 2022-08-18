import { RejoinConferenceButton, Space, useTheme } from '@dolbyio/comms-uikit-react';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import useConferenceCreate from '../../hooks/useConferenceCreate';
import { Routes } from '../../types/routes.types';
import OverlaySpinner from '../OverlaySpinner';

export const Rejoin = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { meetingName } = useConferenceCreate();
  const [isLoading, setIsLoading] = useState(false);
  const { isMobile, isMobileSmall, getColor } = useTheme();

  const isSmartphone = isMobile || isMobileSmall;

  const onSuccess = () => {
    navigate(`${Routes.Conference}?id=${encodeURIComponent(meetingName)}`, { replace: true });
  };

  const customStyles = useMemo(() => {
    const styles = {
      width: isSmartphone ? 275 : 400,
      height: isSmartphone ? 44 : 56,
      borderWidth: 2,
      borderColor: isSmartphone ? getColor('white') : getColor('primary.500'),
    };

    return styles;
  }, [isSmartphone]);

  return (
    <Space mt="m">
      {isLoading && <OverlaySpinner textID="joiningMeeting" />}
      <RejoinConferenceButton
        style={customStyles}
        onStart={setIsLoading}
        onSuccess={onSuccess}
        text={intl.formatMessage({ id: 'rejoin' })}
        testID="RejoinButton"
      />
    </Space>
  );
};
