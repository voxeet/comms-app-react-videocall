/* eslint-disable import/no-extraneous-dependencies */
import { Space, useTheme, ColorKey } from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import React, { useMemo } from 'react';

import styles from './Switch.module.scss';

type SwitchProps = {
  isActive: boolean;
  onClick?: () => void;
  testID?: string;
  defaultSwitchColor?: ColorKey;
  activeSwitchColor?: ColorKey;
  defaultSwitchHandlerColor?: ColorKey;
  activeSwitchHandlerColor?: ColorKey;
};

const Switch = ({
  isActive = false,
  onClick,
  testID,
  defaultSwitchColor = 'grey.300',
  activeSwitchColor = 'infoSuccess',
  defaultSwitchHandlerColor = 'white',
  activeSwitchHandlerColor = 'white',
}: SwitchProps) => {
  const { getColor, theme } = useTheme();

  const switchBackgroundColor = useMemo(() => {
    let color = getColor(defaultSwitchColor);

    if (isActive) {
      color = getColor(activeSwitchColor);
    }

    return color;
  }, [isActive, defaultSwitchColor, activeSwitchColor, theme]);

  const handlerBackgroundColor = useMemo(() => {
    let color = getColor(defaultSwitchHandlerColor);

    if (isActive) {
      color = getColor(activeSwitchHandlerColor);
    }

    return color;
  }, [isActive, defaultSwitchHandlerColor, activeSwitchHandlerColor, theme]);

  return (
    <Space
      testID={testID}
      className={styles.switch}
      style={{ backgroundColor: switchBackgroundColor }}
      onClick={onClick}
    >
      <Space
        className={cx(styles.switchHandler, isActive && styles.active)}
        style={{ backgroundColor: handlerBackgroundColor, borderColor: switchBackgroundColor }}
      />
    </Space>
  );
};

export default Switch;
