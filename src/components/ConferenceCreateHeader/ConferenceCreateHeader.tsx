import Text from '@components/Text';
import { SideDrawerContentTypes } from '@context/SideDrawerContext';
import { IconButton, useTheme, Space } from '@dolbyio/comms-uikit-react';
import useConferenceCreate from '@hooks/useConferenceCreate';
import useDrawer from '@hooks/useDrawer';
import { CreateStep } from '@src/types/routes';
import React, { useMemo } from 'react';

import styles from './ConferenceCreateHeader.module.scss';

export const headerSizes = {
  small: 48,
  medium: 64,
  large: 72,
};

export const ConferenceCreateHeader = () => {
  const { step, prevStep } = useConferenceCreate();
  const { getColor, isMobile, isMobileSmall, isTablet, isLandscape } = useTheme();
  const { openDrawer } = useDrawer();

  const headerHeight = useMemo(() => {
    let height = headerSizes.large;

    if (isTablet) {
      if (isLandscape) {
        height = headerSizes.large;
      } else {
        height = headerSizes.medium;
      }
    } else if (isMobile || isMobileSmall) {
      height = headerSizes.small;
    }

    return height;
  }, [isTablet, isMobile, isMobileSmall, isLandscape]);
  return (
    <Space
      fw
      id="ConferenceCreateHeader"
      testID="ConferenceCreateHeader"
      className={styles.container}
      style={{ borderBottom: `1px solid ${getColor('grey.100')}`, height: headerHeight }}
    >
      <Space style={{ width: 48 }}>
        {step > CreateStep.username && (
          <IconButton
            testID="StepBackButton"
            backgroundColor="transparent"
            icon="arrowLeft"
            iconColor="black"
            onClick={prevStep}
          />
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
            onClick={() => openDrawer(SideDrawerContentTypes.DEVICE_SETUP)}
            iconColor="black"
          />
        )}
      </Space>
    </Space>
  );
};
