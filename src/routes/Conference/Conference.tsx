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
  Conference as ConferenceComponent,
  useTheme,
} from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useIntl } from 'react-intl';

import ActionBar from '../../components/ActionBar';
import AllowAudioModal from '../../components/AllowAudioModal';
import { BottomDrawer } from '../../components/BottomDrawer';
import Backdrop from '../../components/Drawer/Backdrop';
import MobileBottomActionBar from '../../components/MobileBottomActionBar';
import MobileTopActionBar from '../../components/MobileTopActionBar';
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
  const { isDesktop, isMobile, isMobileSmall, isTablet, isLandscape } = useTheme();
  const barRef = useRef<HTMLDivElement>(null);

  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState<boolean>(false);

  const openBottomDrawer = () => {
    setIsBottomDrawerOpen(true);
  };
  const closeBottomDrawer = () => {
    setIsBottomDrawerOpen(false);
  };

  useEffect(() => {
    document.title = `${document.title} - ${meetingName}`;
    return () => {
      // eslint-disable-next-line prefer-destructuring
      document.title = document.title.split(' - ')[0];
    };
  }, [meetingName]);

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

  const isSmartphone = isMobile || isMobileSmall;

  const isOneParticipant = useMemo(() => {
    return participants.length === 1;
  }, [participants]);

  return (
    <DrawerProvider>
      <ConferenceComponent id={conference?.id}>
        <Layout testID="ConferenceRoute" className={cx(styles.layoutWrapper)}>
          <Backdrop visible={isBottomDrawerOpen} />
          <Space fh className={styles.container}>
            {!isDesktop && <MobileTopActionBar />}
            <Space
              className={cx(styles.videoGrid, {
                [styles.one]: isOneParticipant,
                [styles.mobile]: isMobileSmall && !isOneParticipant,
                [styles.mobileColumnOneParticipant]:
                  isOneParticipant && ((isSmartphone && !isLandscape) || (!isLandscape && isTablet)),
              })}
              pr={isSmartphone ? undefined : 'm'}
              pl={isSmartphone ? undefined : 'm'}
              style={{
                height: isSmartphone ? '100%' : `calc(100% - ${barRef.current?.clientHeight}px)`,
              }}
            >
              <ParticipantsGrid
                localText={intl.formatMessage({ id: 'you' })}
                testID="ParticipantsGrid"
                additionalContainerStyle={
                  isOneParticipant && !isDesktop
                    ? {
                        width: isTablet ? '100%' : `calc(100% -  16px)`,
                        overflowX: 'unset',
                        overflowY: 'unset',
                        paddingLeft: isLandscape && !isTablet ? '8px' : 'unset',
                      }
                    : undefined
                }
              />
              {isOneParticipant && <OneParticipant />}
            </Space>
            <div ref={barRef}>
              {isDesktop ? (
                <ActionBar />
              ) : (
                <Space>
                  <MobileBottomActionBar openBottomDrawer={openBottomDrawer} />
                </Space>
              )}
            </div>
            {!isDesktop && (
              <Space
                className={cx(
                  styles.bottomDrawer,
                  isBottomDrawerOpen && styles.active,
                  !isTablet && styles.smartphones,
                )}
              >
                <BottomDrawer close={closeBottomDrawer} />
              </Space>
            )}
            <ParticipantsDrawer />
          </Space>
          <AllowAudioModal />
        </Layout>
      </ConferenceComponent>
    </DrawerProvider>
  );
};
