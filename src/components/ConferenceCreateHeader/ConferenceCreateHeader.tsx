import { IconButton, useTheme, Space } from '@dolbyio/comms-uikit-react';
import React from 'react';

import useConferenceCreate from '../../hooks/useConferenceCreate';
import useDrawer from '../../hooks/useDrawer';
import { CreateStep } from '../../types/routes.types';
import Text from '../Text';

import styles from './ConferenceCreateHeader.module.scss';

export const ConferenceCreateHeader = () => {
  const { step, prevStep } = useConferenceCreate();
  const { getColor } = useTheme();
  const { openDrawer } = useDrawer();
  return (
    <Space
      testID="ConferenceCreateHeader"
      className={styles.container}
      style={{ borderBottom: `1px solid ${getColor('grey.100')}` }}
    >
      <Space style={{ width: 48 }}>
        {step > CreateStep.username && (
          <IconButton testID="StepBackButton" backgroundColor="transparent" icon="arrowLeft" onClick={prevStep} />
        )}
      </Space>
      <Text
        testID="ConferenceCreateHeaderTitle"
        color="black"
        type="H4"
        id={step === CreateStep.deviceSetup ? 'setUp' : 'joinMeeting'}
      />
      <Space style={{ width: 48 }}>
        {step === CreateStep.deviceSetup && (
          <IconButton
            testID="SettingsButton"
            backgroundColor="transparent"
            icon="settings"
            onClick={openDrawer}
            iconColor="black"
          />
        )}
      </Space>
    </Space>
  );
};
