import {
  useConference,
  Layout,
  useAudio,
  useParticipants,
  useCamera,
  useMicrophone,
  useSpeaker,
  useVideo,
  Space,
  ParticipantsGrid,
} from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';

import ActionBar from '../../components/ActionBar';
import OneParticipant from '../../components/OneParticipant';
import OverlaySpinner from '../../components/OverlaySpinner';
import ParticipantsDrawer from '../../components/ParticipantsDrawer';
import { DrawerProvider } from '../../context/DrawerContext';
import useConferenceCreate from '../../hooks/useConferenceCreate';

import styles from './Conference.module.scss';

export const Conference = () => {
  const { conference } = useConference();
  const { participants } = useParticipants();
  const { meetingName } = useConferenceCreate();
  const { selectCamera, localCamera } = useCamera();
  const { isVideo } = useVideo();
  const { selectMicrophone, localMicrophone } = useMicrophone();
  const { isAudio } = useAudio();
  const { selectSpeaker, localSpeakers } = useSpeaker();
  const intl = useIntl();

  useEffect(() => {
    document.title = `${document.title} - ${meetingName}`;
    return () => {
      // eslint-disable-next-line prefer-destructuring
      document.title = document.title.split(' - ')[0];
    };
  }, [meetingName]);

  // useEffect(() => {
  //   return () => {
  //     leaveConference();
  //   };
  // }, []);

  useEffect(() => {
    (async () => {
      if (localCamera && localCamera.deviceId && isVideo) {
        try {
          await selectCamera(localCamera.deviceId);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [localCamera, isVideo]);

  useEffect(() => {
    (async () => {
      if (localMicrophone && localMicrophone.deviceId && isAudio) {
        try {
          await selectMicrophone(localMicrophone.deviceId);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [localMicrophone, isAudio]);

  useEffect(() => {
    (async () => {
      if (localSpeakers && localSpeakers.deviceId) {
        try {
          await selectSpeaker(localSpeakers.deviceId);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [localSpeakers]);

  return (
    <DrawerProvider>
      {conference && participants ? (
        <Layout testID="ConferenceRoute" style={{ height: '100vh', padding: '20px' }}>
          <Space fh className={styles.container}>
            <Space mb="m" className={cx(styles.videoGrid, { [styles.one]: participants.length === 1 })}>
              <ParticipantsGrid localText={intl.formatMessage({ id: 'you' })} testID="ParticipantsGrid" />
              {participants.length === 1 && <OneParticipant />}
            </Space>
            <ActionBar />
            <ParticipantsDrawer />
          </Space>
        </Layout>
      ) : (
        <OverlaySpinner textID="joiningMeeting" />
      )}
    </DrawerProvider>
  );
};
