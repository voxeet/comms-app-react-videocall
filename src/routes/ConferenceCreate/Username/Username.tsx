import { Input, ValidationType, Button, Space, useTheme } from '@dolbyio/comms-uikit-react';
import React, { useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

import Text from '../../../components/Text';
import useConferenceCreate from '../../../hooks/useConferenceCreate';
import { useEnter } from '../../../hooks/useEnter';
import { CreateStep } from '../../../types/routes.types';
import { isValid } from '../../../utils/validation.util';

import styles from './Username.module.scss';

type UsernameProps = {
  inputAutoFocus?: boolean;
  setInputAsFocused: () => void;
  setInputAsUnfocused: () => void;
};

const paddingTopSizes = {
  null: 0,
  small: 24,
  large: 88,
};

export const Username = ({ inputAutoFocus = true, setInputAsFocused, setInputAsUnfocused }: UsernameProps) => {
  const [validation, setValidation] = useState<ValidationType>({ valid: true });
  const { username, setUsername, nextStep, setMeetingName, setStep } = useConferenceCreate();
  const [name, setName] = useState(username);
  const [searchParams] = useSearchParams();
  const intl = useIntl();
  const { isMobile, isMobileSmall, isDesktop, isTablet } = useTheme();

  const myRef = useRef<HTMLDivElement | null>(null);

  const handleOnFocus = () => {
    setInputAsFocused();
  };

  const handleOnBlur = () => {
    setInputAsUnfocused();
  };

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

  const isSmartphone = isMobileSmall || isMobile;

  const handlePaddingTop = useMemo(() => {
    let padding = paddingTopSizes.large;
    if (isSmartphone) {
      padding = paddingTopSizes.small;
    }

    if (isTablet) {
      padding = paddingTopSizes.large;
    }

    return padding;
  }, [isMobileSmall, isMobile, isDesktop, isTablet]);

  return (
    <Space fh fw className={styles.wrapper}>
      <Space className={styles.contentContainer} mh="m" style={{ paddingTop: handlePaddingTop }}>
        <Text testID="EnterName" type="H1" id="enterName" color="black" />
        <Space mt="xs">
          <Text testID="EnterNameDisclaimer" color="grey.500" id="enterNameDisclaimer" />
        </Space>
        <Space mt="l">
          <div ref={myRef}>
            <Input
              testID="UsernameInput"
              label={intl.formatMessage({ id: 'name' })}
              value={name}
              onChange={onChange}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              validation={validation}
              autoFocus={inputAutoFocus}
            />
          </div>
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
    </Space>
  );
};
