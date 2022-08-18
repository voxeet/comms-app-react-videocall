import { Layout, useTheme } from '@dolbyio/comms-uikit-react';
import React, { useMemo, useState } from 'react';

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
  const { isDesktop } = useTheme();

  const [isInputFocused, setIsInputFocused] = useState(false);

  const isFooterVisible = useMemo(() => {
    let visibility = true;

    if (!isDesktop) {
      if (step === CreateStep.deviceSetup) {
        visibility = false;
      } else if (isInputFocused) {
        visibility = false;
      }
    }

    return visibility;
  }, [isDesktop, step, isInputFocused]);

  const setInputAsFocused = () => {
    setIsInputFocused(true);
  };

  const setInputAsUnfocused = () => {
    setIsInputFocused(false);
  };

  return (
    <DrawerProvider>
      <Layout testID="ConferenceCreateRoute" backgroundColor="white" className={styles.layout}>
        <ConferenceCreateHeader />

        {step === CreateStep.username && (
          <Username
            inputAutoFocus={isDesktop}
            setInputAsFocused={setInputAsFocused}
            setInputAsUnfocused={setInputAsUnfocused}
          />
        )}
        {step === CreateStep.meetingName && (
          <MeetingName
            inputAutoFocus={isDesktop}
            setInputAsFocused={setInputAsFocused}
            setInputAsUnfocused={setInputAsUnfocused}
          />
        )}
        {step === CreateStep.deviceSetup && <DeviceSetup />}

        {isFooterVisible && <ConferenceCreateFooter />}
      </Layout>
    </DrawerProvider>
  );
};
