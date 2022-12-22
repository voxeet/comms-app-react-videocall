import Text from '@components/Text';
import { Space, Icon, type IconComponentName, useTheme, ColorKey } from '@dolbyio/comms-uikit-react';
import { TranslationKeys } from '@src/types/translations';
import React, { type ComponentProps, type ReactNode } from 'react';

import styles from './DrawerOption.module.scss';

type DrawerOptionProps = {
  headline?: TranslationKeys;
  description?: TranslationKeys;
  icon?: IconComponentName;
  iconColor?: ColorKey;
  headlineActionComponent?: ReactNode;
  border?: boolean;
  testID?: string;
  children?: ((containerStyle: ComponentProps<typeof Space>) => JSX.Element) | ReactNode;
};

export const DrawerOption = ({
  border = true,
  headline,
  description,
  icon,
  iconColor,
  children,
  testID = 'DropdownOption',
  headlineActionComponent,
}: DrawerOptionProps) => {
  const { getColor } = useTheme();

  const containerStyle = border ? { borderTop: `solid ${getColor('grey.700')} 0.3px` } : undefined;
  if (typeof children === 'function') {
    return children({ style: containerStyle, ph: 'm', pv: 's' });
  }
  return (
    <Space ph="m" pv="s" className={styles.container} style={containerStyle} testID={testID}>
      <Space className={styles.headSection}>
        <Space className={styles.left}>
          {icon && <Icon color={getColor(iconColor || 'grey.200')} name={icon} />}
          <Space ml="xs">
            <Text type="paragraphSmall" color="grey.200" id={headline} />
          </Space>
        </Space>
        {headlineActionComponent}
      </Space>
      {description && (
        <Space fw pt="xs">
          <Text type="caption" color="grey.400" id={description} className={styles.description} />
        </Space>
      )}
      {children}
    </Space>
  );
};
