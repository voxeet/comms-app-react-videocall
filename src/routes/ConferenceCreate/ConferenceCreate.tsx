import ConferenceCreateFooter from '@components/ConferenceCreateFooter';
import ConferenceCreateHeader from '@components/ConferenceCreateHeader';
import { Layout, useCamera, useTheme } from '@dolbyio/comms-uikit-react';
import useConferenceCleanup from '@hooks/useConferenceCleanup';
import useConferenceCreate from '@hooks/useConferenceCreate';
import useSDKErrorHandler from '@hooks/useSDKErrorsHandler';
import { SideDrawerProvider } from '@src/context/SideDrawerContext';
import ConferenceCreateInput from '@src/routes/ConferenceCreate/ConferenceCreateInput';
import DeviceSetup from '@src/routes/ConferenceCreate/DeviceSetup';
import { CreateStep } from '@src/types/routes';
import cx from 'classnames';
import { useEffect, useMemo, useState } from 'react';

import styles from './ConferenceCreate.module.scss';

const isIPhone = navigator.userAgent.match(/iPhone/i);

export const ConferenceCreate = () => {
  const { step, setStep } = useConferenceCreate();
  const { isDesktop } = useTheme();
  const { stopLocalVideo, setLocalCamera } = useCamera();
  useConferenceCleanup();
  useSDKErrorHandler(
    () => setStep(CreateStep.username),
    async () => {
      await stopLocalVideo();
    },
  );

  useEffect(() => {
    if (step !== CreateStep.deviceSetup) {
      stopLocalVideo();
      setLocalCamera(null);
    }
  }, [setLocalCamera, step, stopLocalVideo]);

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
