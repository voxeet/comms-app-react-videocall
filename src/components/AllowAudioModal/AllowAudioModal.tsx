import { Space, Text, useTheme, Button, useAudio, BlockedAudioStateType } from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import styles from './AllowAudioModal.module.scss';
import Modal from './Modal';
import ModalHeaderLogo from './ModalHeaderLogo';
import Switch from './Switch';

type AllowAudioModalProps = {
  testID?: string;
};

const AllowAudioModal = ({ testID }: AllowAudioModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllowAudioChecked, setIsAllowAudioChecked] = useState(false);
  const intl = useIntl();
  const { getColor, isDesktop, isMobile, isMobileSmall, isLandscape } = useTheme();
  const { playBlockedAudio, blockedAudioState, markBlockedAudioEnabled } = useAudio();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    (() => {
      setTimeout(() => {
        if (blockedAudioState === BlockedAudioStateType.ACTIVATED) {
          openModal();
        } else {
          closeModal();
        }
      }, 2000);
    })();
  }, []);

  const handleAllowAudio = async () => {
    await playBlockedAudio();
    markBlockedAudioEnabled();
    closeModal();
  };

  const isSmartphone = isMobile || isMobileSmall;

  return (
    <Modal testID={testID} isVisible={isModalOpen} closeFunction={closeModal}>
      <Space
        className={cx(
          styles.contentWrapper,
          !isDesktop && styles.mobile,
          isSmartphone && styles.smartphone,
          isLandscape && styles.landscape,
          isMobileSmall && styles.mobileSmall,
        )}
      >
        <Space pb="m" className={styles.mainSection} style={{ borderColor: getColor('grey.700') }}>
          {isMobileSmall && isLandscape ? null : <ModalHeaderLogo icon="speaker" />}
          <Space mt="s">
            <Text type="H2" color="grey.100">
              {intl.formatMessage({ id: 'allowAudio' })}
            </Text>
          </Space>
          <Space mt="xs" ph="xl">
            <Text className={styles.allowAudioDescr} type="bodyDefault" color="grey.100">
              {intl.formatMessage({ id: 'allowAudioDescr' })}
            </Text>
          </Space>
        </Space>
        <Space fw pv="s" className={styles.switchSection} style={{ borderColor: getColor('grey.700') }}>
          <Space ml="l">
            <Text className={styles.allowAudioDescr} type="bodyDefault" color="grey.200">
              {intl.formatMessage({ id: 'playingAudio' })}
            </Text>
          </Space>
          <Space mr="l" className={styles.allowAudioSwitch}>
            <Switch isActive={isAllowAudioChecked} onClick={() => setIsAllowAudioChecked(!isAllowAudioChecked)} />
          </Space>
        </Space>
        <Space pv="m" ph="m" className={styles.buttonSection}>
          <Button disabled={!isAllowAudioChecked} style={{ width: '327px' }} onClick={handleAllowAudio}>
            {intl.formatMessage({ id: 'confirm' })}
          </Button>
        </Space>
      </Space>
    </Modal>
  );
};

export default AllowAudioModal;
