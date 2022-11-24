import { Twitch, YouTubeStudio, FacebookLive } from '@assets/index';
import ModalContentBase from '@components/ModalContentBase/ModalContentBase';
import Text from '@components/Text';
import { Input, Modal, Space } from '@dolbyio/comms-uikit-react';
import { useLiveStreaming } from '@hooks/useLiveStreaming';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import styles from './LiveStreamingModal.module.scss';

type LiveStreamingModalProps = {
  testID?: string;
  isOpen: boolean;
  closeModal: () => void;
  onActionSuccess?: () => void;
};

const LiveStreamingModal = ({
  testID = 'LiveStreamingInputModal',
  isOpen,
  closeModal,
  onActionSuccess,
}: LiveStreamingModalProps) => {
  const intl = useIntl();
  const [serverUrl, setServerUrl] = useState('');
  const [streamKey, setStreamKey] = useState('');
  const { streamHandler } = useLiveStreaming();

  /*
   * Since usage of this modal can be separated from UIKit , we need to be sure to clear inputs while closing modal (ex using as render props within always present dock)
   */

  useEffect(() => {
    if (!isOpen) {
      setStreamKey('');
      setServerUrl('');
    }
  }, [isOpen]);

  const startStreamingHandler = async () => {
    streamHandler('start', `${serverUrl.at(-1) === '/' ? serverUrl : `${serverUrl}/`}${streamKey}`);
    closeModal();
    onActionSuccess?.();
  };

  return (
    <Modal testID={testID} isVisible={isOpen} close={closeModal} closeButton>
      <ModalContentBase
        headline={intl.formatMessage({ id: 'goLive!' })}
        description={intl.formatMessage({
          id: 'streamingModalDesc',
        })}
        buttons={[
          {
            disabled: !(streamKey.length && serverUrl.length),
            onClick: startStreamingHandler,
            label: intl.formatMessage({ id: 'startStreaming' }),
          },
        ]}
      >
        <Space fw ph="m" pt="m">
          <Space id="logos section" fw className={styles.logosContainer} mb="m">
            <Twitch />
            <YouTubeStudio />
            <FacebookLive />
            <Text id="andOthers" color="grey.200" type="captionSmall" />
          </Space>
          <Space mb="m">
            <Input
              borderColor="grey.300"
              labelColor="white"
              labelBackground="grey.800"
              value={serverUrl}
              label={intl.formatMessage({ id: 'serverUrl' })}
              placeholder="rtmp://x.rtmp.youtube.com/live2/{yout..."
              onChange={(e) => {
                setServerUrl(e.target.value);
              }}
              textColor="white"
            />
          </Space>
          <Input
            borderColor="grey.300"
            secure
            labelColor="white"
            labelBackground="grey.800"
            value={streamKey}
            label={intl.formatMessage({ id: 'streamKey' })}
            placeholder="live_65900815_34aUHJq8QQ2iGk..."
            textColor="white"
            onChange={(e) => {
              setStreamKey(e.target.value);
            }}
          />
        </Space>
      </ModalContentBase>
    </Modal>
  );
};

export default LiveStreamingModal;
