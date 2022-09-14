import { Layout, useTheme } from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import React, { useMemo, useState } from 'react';

import ConferenceCreateFooter from '../../components/ConferenceCreateFooter';
import ConferenceCreateHeader from '../../components/ConferenceCreateHeader';
import { DrawerProvider } from '../../context/DrawerContext';
import useConferenceCleanup from '../../hooks/useConferenceCleanup';
import useConferenceCreate from '../../hooks/useConferenceCreate';
import { CreateStep } from '../../types/routes.types';

import styles from './ConferenceCreate.module.scss';
import ConferenceCreateInput from './ConferenceCreateInput';
import DeviceSetup from './DeviceSetup';

const isIPhone = navigator.userAgent.match(/iPhone/i);

export const ConferenceCreate = () => {
  const { step } = useConferenceCreate();
  const { isDesktop } = useTheme();
  useConferenceCleanup();

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
      <Layout
        testID="ConferenceCreateRoute"
        backgroundColor="white"
        className={cx(styles.layout, { [styles.layoutSafari]: isIPhone })}
      >
        <ConferenceCreateHeader />

        {step === CreateStep.username && (
          <ConferenceCreateInput
            type="user"
            inputAutoFocus={isDesktop}
            setInputAsFocused={setInputAsFocused}
            setInputAsUnfocused={setInputAsUnfocused}
          />
        )}
        {step === CreateStep.meetingName && (
          <ConferenceCreateInput
            type="meeting"
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
