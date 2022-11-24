import ConferenceCreateFooter from '@components/ConferenceCreateFooter';
import ConferenceCreateHeader from '@components/ConferenceCreateHeader';
import { Layout, useTheme } from '@dolbyio/comms-uikit-react';
import useConferenceCleanup from '@hooks/useConferenceCleanup';
import useConferenceCreate from '@hooks/useConferenceCreate';
import { SideDrawerProvider } from '@src/context/SideDrawerContext';
import ConferenceCreateInput from '@src/routes/ConferenceCreate/ConferenceCreateInput';
import DeviceSetup from '@src/routes/ConferenceCreate/DeviceSetup';
import { CreateStep } from '@src/types/routes';
import cx from 'classnames';
import React, { useMemo, useState } from 'react';

import styles from './ConferenceCreate.module.scss';

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
    <SideDrawerProvider>
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
    </SideDrawerProvider>
  );
};
