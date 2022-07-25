import { Layout, Space } from '@dolbyio/comms-uikit-react';
import React from 'react';

import ConferenceCreateFooter from '../../components/ConferenceCreateFooter';
import ConferenceCreateHeader from '../../components/ConferenceCreateHeader';
import { DrawerProvider } from '../../context/DrawerContext';
import useConferenceCreate from '../../hooks/useConferenceCreate';
import { CreateStep } from '../../types/routes.types';

import styles from './ConferenceCreate.module.scss';
import DeviceSetup from './DeviceSetup';
import MeetingName from './MeetingName';
import Username from './Username';

export const ConferenceCreate = () => {
  const { step } = useConferenceCreate();
  return (
    <DrawerProvider>
      <Layout testID="ConferenceCreateRoute" backgroundColor="white">
        <ConferenceCreateHeader />
        <Space className={styles.container}>
          {step === CreateStep.username && <Username />}
          {step === CreateStep.meetingName && <MeetingName />}
          {step === CreateStep.deviceSetup && <DeviceSetup />}
        </Space>
        <ConferenceCreateFooter />
      </Layout>
    </DrawerProvider>
  );
};
