import ModalHeaderLogo from '@components/ModalContentBase/ModalHeaderLogo';
import { Space, useTheme, Button, Text, IconComponentName } from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import React, { ComponentProps } from 'react';

import styles from './ModalContentBase.module.scss';

export type Buttons = Array<ComponentProps<typeof Button> & { label: string }>;
type ModalContentBaseProps = {
  children?: React.ReactNode;
  testID?: string;
  buttons?: Buttons;
  headline?: string;
  description?: string;
  headerLogo?: Extract<IconComponentName, 'present' | 'speaker' | 'record' | 'stream' | 'tune'>;
};

const ModalContentBase = ({ children, buttons, headline, description, headerLogo }: ModalContentBaseProps) => {
  const { isDesktop, isMobile, isMobileSmall, isLandscape } = useTheme();

  const isSmartphone = isMobile || isMobileSmall;

  return (
    <Space
      className={cx(
        styles.contentWrapper,
        !isDesktop && styles.mobile,
        isSmartphone && styles.smartphone,
        isLandscape && styles.landscape,
        isMobileSmall && styles.mobileSmall,
      )}
    >
      <Space className={styles.mainSection}>
        {(isMobileSmall && isLandscape) || !headerLogo ? null : <ModalHeaderLogo icon={headerLogo} />}
        <Space mt="s">
          <Text type="H2" color="grey.100">
            {headline}
          </Text>
        </Space>
        <Space mt="xs" ph="xl">
          <Text className={styles.description} type="bodyDefault" color="grey.100">
            {description}
          </Text>
        </Space>
      </Space>
      {children}
      {buttons && (
        <Space pv="m" ph="m" fw>
          {buttons.map(({ label, ...buttonConfig }, idx) => (
            <Space mb={idx < buttons.length - 1 && 's'} key={label}>
              <Button {...buttonConfig} size="s" fw>
                <Text type="caption" style={{ lineHeight: '20px' }}>
                  {label}
                </Text>
              </Button>
            </Space>
          ))}
        </Space>
      )}
    </Space>
  );
};

export default ModalContentBase;
