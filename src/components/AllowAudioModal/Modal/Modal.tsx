/* eslint-disable import/no-extraneous-dependencies */
import { ColorKey } from '@dolbyio/comms-uikit-common';
import { Space, useTheme, IconButton } from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import React, { useMemo } from 'react';

import styles from './Modal.module.scss';

type ModalProps = {
  isVisible: boolean;
  closeFunction: () => void;
  children: React.ReactNode;
  backdropColor?: ColorKey;
  backgroundColor?: ColorKey;
  closeButtonColor?: ColorKey;
  closeIconColor?: ColorKey;
  modalWidth?: number;
  testID?: string;
};

const Modal = ({
  isVisible,
  closeFunction,
  children,
  backdropColor = 'rgba(0,0,0, 0.24)',
  backgroundColor = 'grey.800',
  closeButtonColor = 'grey.500',
  closeIconColor = 'white',
  modalWidth = 375,
  testID,
}: ModalProps) => {
  const { getColor, isDesktop, isTablet, isMobile, isMobileSmall, isLandscape } = useTheme();

  if (!isVisible) return null;

  const isSmartphone = isMobile || isMobileSmall;

  return (
    <Space
      fw
      fh
      testID={testID}
      className={styles.backdropWrapper}
      style={{ backgroundColor: getColor(backdropColor) }}
    >
      <Space
        testID={testID ? `${testID}-modal` : undefined}
        className={cx(
          styles.modalWrapper,
          !isDesktop && styles.mobile,
          isTablet && styles.tablet,
          isLandscape && styles.landscape,
        )}
        style={{
          backgroundColor: getColor(backgroundColor),
          width: isSmartphone && !isLandscape ? '100%' : `${modalWidth}px`,
          height: isMobile && isLandscape ? '100vh' : 'auto',
        }}
      >
        <>
          <Space className={styles.closeButton}>
            <IconButton
              icon="close"
              size={isDesktop ? 'm' : 's'}
              backgroundColor={isDesktop ? getColor(closeButtonColor) : getColor('transparent')}
              iconColor={getColor(closeIconColor)}
              variant="circle"
              onClick={closeFunction}
            />
          </Space>
          {children}
        </>
      </Space>
    </Space>
  );
};

export default Modal;
