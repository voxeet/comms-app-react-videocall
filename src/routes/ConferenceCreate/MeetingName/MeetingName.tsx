import { Input, ValidationType, Button, Space } from '@dolbyio/comms-uikit-react';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import Text from '../../../components/Text';
import useConferenceCreate from '../../../hooks/useConferenceCreate';
import { useEnter } from '../../../hooks/useEnter';
import { isValid } from '../../../utils/validation.util';

import styles from './MeetingName.module.scss';

export const MeetingName = () => {
  const { username, meetingName, setMeetingName, nextStep } = useConferenceCreate();
  const [validation, setValidation] = useState<ValidationType>({ valid: true });
  const [name, setName] = useState(meetingName);
  const intl = useIntl();

  const next = () => {
    if (validation.valid && name.length !== 0) {
      setMeetingName(name);
      nextStep();
    }
  };

  useEnter(next, name);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const valid = isValid(value);
    setValidation({
      valid,
      message: valid ? undefined : intl.formatMessage({ id: 'meetingTitleValidation' }),
    });
    setName(value);
  };

  return (
    <Space className={styles.container}>
      <Text testID="HelloUser" type="H1" id="hiName" values={{ name: username }} color="black" />
      <Space mt="xs">
        <Text testID="MeetingTitleDisclaimer" color="grey.500" id="meetingTitleDisclaimer" />
      </Space>
      <Space mt="l">
        <Input
          testID="MeetingNameInput"
          label={intl.formatMessage({ id: 'meetingTitle' })}
          value={name}
          onChange={onChange}
          validation={validation}
          autoFocus
        />
      </Space>
      <Space mt="m">
        <Button
          testID="MeetingNameJoinButton"
          variant="primary"
          onClick={next}
          disabled={!validation.valid || name.length === 0}
          style={{ width: 400, height: 56 }}
        >
          <Text testID="JoinButtonText" type="buttonDefault" id="join" />
        </Button>
      </Space>
    </Space>
  );
};
