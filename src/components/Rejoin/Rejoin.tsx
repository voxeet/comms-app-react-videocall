import {
  RejoinConferenceButton,
  Space,
  Overlay,
  Spinner,
  useCamera,
  useVideo,
  useMicrophone,
  useAudio,
} from '@dolbyio/comms-uikit-react';
import useConferenceCreate from '@hooks/useConferenceCreate';
import { Routes } from '@src/types/routes';
import React, { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import setJoinOptions, { JoinParams } from '../../utils/setJoinOptions';

import styles from './Rejoin.module.scss';

export const Rejoin = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { meetingName } = useConferenceCreate();
  const [isLoading, setIsLoading] = useState(false);
  const [isMicrophonePermission, setIsMicrophonePermission] = useState<boolean>(false);
  const [isCameraPermission, setIsCameraPermission] = useState<boolean>(false);

  const { getCameraPermission } = useCamera();
  const { isVideo } = useVideo();
  const { getMicrophonePermission } = useMicrophone();
  const { isAudio } = useAudio();

  const checkPermissions = async () => {
    const microphonePermission = await getMicrophonePermission();
    const cameraPermission = await getCameraPermission();

    setIsMicrophonePermission(microphonePermission);
    setIsCameraPermission(cameraPermission);
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  const joinParams: JoinParams = {
    isMicrophonePermission,
    isCameraPermission,
    isAudio,
    isVideo,
  };

  const joinOptions = useMemo(() => {
    return setJoinOptions(joinParams);
  }, [isMicrophonePermission, isCameraPermission, isAudio, isVideo]);

  const onSuccess = () => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get('id')) {
      params.append('id', meetingName);
    }
    navigate(`${Routes.Conference}?${params.toString()}`, { replace: true });
  };

  return (
    <Space mt="m">
      <Overlay visible={isLoading} opacity={1}>
        <Spinner textContent={intl.formatMessage({ id: 'joiningMeeting' })} />
      </Overlay>
      <RejoinConferenceButton
        className={styles.button}
        onStart={setIsLoading}
        onSuccess={onSuccess}
        text={intl.formatMessage({ id: 'rejoin' })}
        joinOptions={joinOptions}
        testID="RejoinButton"
      />
    </Space>
  );
};
