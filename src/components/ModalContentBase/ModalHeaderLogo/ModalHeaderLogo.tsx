import { Space, Icon, useTheme, ColorKey, IconComponentName } from '@dolbyio/comms-uikit-react';
import React, { useCallback, useMemo } from 'react';

import styles from './ModalHeaderLogo.module.scss';

type ModalHeaderLogoProps = {
  primaryBackgroundColor?: ColorKey | [ColorKey, ColorKey];
  secondaryBackgroundColor?: ColorKey | [ColorKey, ColorKey];
  borderColor?: ColorKey;
  iconColor?: ColorKey;
  icon?: IconComponentName;
};

const ModalHeaderLogo = ({
  primaryBackgroundColor = ['rgba(255, 255, 255, 0.16)', 'rgba(255, 255, 255, 0.48)'],
  secondaryBackgroundColor = ['secondary.600', 'primary.500'],
  borderColor = 'rgba(255, 255, 255, 0.64)',
  iconColor = 'white',
  icon,
}: ModalHeaderLogoProps) => {
  const { theme, getColorOrGradient, getColor } = useTheme();

  const isGradient = useCallback((color: ColorKey | [ColorKey, ColorKey]) => {
    return Array.isArray(color);
  }, []);

  const handlePrimaryBackgroundColor = useMemo(() => {
    let color = getColorOrGradient(primaryBackgroundColor);

    if (!isGradient(primaryBackgroundColor)) {
      color = getColor(primaryBackgroundColor as string);
    } else {
      color = `linear-gradient(315deg, ${color[0]} 0%, ${color[1]} 100%)`;
    }

    return color as string;
  }, [primaryBackgroundColor, theme]);

  const handleSecondaryBackgroundColor = useMemo(() => {
    let color = getColorOrGradient(secondaryBackgroundColor);

    if (!isGradient(secondaryBackgroundColor)) {
      color = getColor(secondaryBackgroundColor as string);
    } else {
      color = `linear-gradient(99.69deg, ${color[0]} -10.66%, ${color[1]} 114.64%)`;
    }

    return color as string;
  }, [secondaryBackgroundColor, theme]);

  return (
    <Space testID="ModalHeaderLogo" className={styles.wrapper}>
      <Space className={styles.bigCircle} style={{ background: handleSecondaryBackgroundColor }} />
      <Space
        className={styles.iconWrapper}
        style={{ background: handlePrimaryBackgroundColor, borderColor: getColor(borderColor) }}
      >
        {icon ? <Icon name={icon} color={getColor(iconColor)} /> : null}
      </Space>
      <Space className={styles.smallCircle} style={{ background: handleSecondaryBackgroundColor }} />
    </Space>
  );
};

export default ModalHeaderLogo;
