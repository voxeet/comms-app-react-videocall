import { Input, ValidationType, Button, Space } from '@dolbyio/comms-uikit-react';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

import Text from '../../../components/Text';
import useConferenceCreate from '../../../hooks/useConferenceCreate';
import { useEnter } from '../../../hooks/useEnter';
import { CreateStep } from '../../../types/routes.types';
import { isValid } from '../../../utils/validation.util';

import styles from './Username.module.scss';

export const Username = () => {
  const [validation, setValidation] = useState<ValidationType>({ valid: true });
  const { username, setUsername, nextStep, setMeetingName, setStep } = useConferenceCreate();
  const [name, setName] = useState(username);
  const [searchParams] = useSearchParams();
  const intl = useIntl();

  const next = () => {
    if (validation.valid && name.length !== 0) {
      setUsername(name);
      const meetingId = searchParams.get('id');
      if (meetingId) {
        setMeetingName(meetingId);
        setStep(CreateStep.deviceSetup);
      } else {
        nextStep();
      }
    }
  };

  useEnter(next, name);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const valid = isValid(value);
    setValidation({
      valid,
      message: valid ? undefined : intl.formatMessage({ id: 'usernameValidation' }),
    });
    setName(value);
  };

  return (
    <Space className={styles.container}>
      <Text testID="EnterName" type="H1" id="enterName" color="black" />
      <Space mt="xs">
        <Text testID="EnterNameDisclaimer" color="grey.500" id="enterNameDisclaimer" />
      </Space>
      <Space mt="l">
        <Input
          testID="UsernameInput"
          label={intl.formatMessage({ id: 'name' })}
          value={name}
          onChange={onChange}
          validation={validation}
          autoFocus
        />
      </Space>
      <Space mt="m">
        <Button
          testID="UsernameNextButton"
          variant="primary"
          disabled={!validation.valid || name.length === 0}
          onClick={next}
          style={{ width: '100%' }}
        >
          Next
        </Button>
      </Space>
    </Space>
  );
};
