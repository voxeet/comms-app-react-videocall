import Text from '@components/Text';
import { Input, ValidationType, Button, Space, useTheme } from '@dolbyio/comms-uikit-react';
import useConferenceCreate from '@hooks/useConferenceCreate';
import { useEnter } from '@hooks/useEnter';
import { CreateStep } from '@src/types/routes';
import { isValid } from '@src/utils/validation';
import React, { useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

import styles from './ConferenceCreateInput.module.scss';

type SetupInputProps = {
  inputAutoFocus?: boolean;
  setInputAsFocused: () => void;
  setInputAsUnfocused: () => void;
  type: 'user' | 'meeting';
};

const paddingTopSizes = {
  null: 0,
  small: 24,
  large: 88,
};

const typeValues = {
  user: {
    headerId: 'enterName',
    headerTestId: 'EnterName',
    disclaimerId: 'enterNameDisclaimer',
    disclaimerTestId: 'EnterNameDisclaimer',
    inputLabel: 'name',
    inputTestId: 'UsernameInput',
    validationMessage: 'genericValidation',
    // validationMessage: 'usernameValidation',
    submitButtonTestId: 'UsernameNextButton',
    submitButtonLabel: 'next',
    buttonHeight: 'unset',
    submitButtonLabelTestId: 'Next',
  },
  meeting: {
    headerId: 'hiName',
    headerTestId: 'HelloUser',
    disclaimerId: 'meetingTitleDisclaimer',
    disclaimerTestId: 'MeetingTitleDisclaimer',
    inputLabel: 'meetingTitle',
    inputTestId: 'MeetingNameInput',
    validationMessage: `genericValidation`,
    // validationMessage: `meetingTitleValidation`,
    submitButtonTestId: 'MeetingNameJoinButton',
    submitButtonLabel: 'join',
    submitButtonLabelTestId: 'JoinButtonText',
    buttonHeight: 48,
  },
} as const;

export const ConferenceCreateInput = ({
  inputAutoFocus = true,
  setInputAsFocused,
  setInputAsUnfocused,
  type,
}: SetupInputProps) => {
  const {
    meetingName,
    username,
    setValue: setContextValue,
    nextStep,
    setStep,
    setMeetingName,
  } = useConferenceCreate(type);
  const [validation, setValidation] = useState<ValidationType>({ valid: true });
  const [value, setValue] = useState(type === 'meeting' ? meetingName : username);
  const [searchParams] = useSearchParams();
  const intl = useIntl();
  const { isMobile, isMobileSmall, isDesktop, isTablet } = useTheme();

  const settings = useMemo(() => typeValues[type], [type]);

  const myRef = useRef<HTMLDivElement | null>(null);

  const validateInput = (value: string, callback?: () => void) => {
    const minChar = type === 'meeting' ? 3 : 2;
    const valid = isValid(value, minChar);
    setValidation(
      value.length
        ? {
            valid,
            message: valid ? undefined : intl.formatMessage({ id: settings.validationMessage }, { minChar }),
          }
        : { valid: true },
    );
    if (valid) callback?.();
  };

  const handleOnFocus = () => {
    setInputAsFocused();
  };

  const handleOnBlur = () => {
    setInputAsUnfocused();
    if (value.length) {
      validateInput(value);
    }
  };

  const next = () => {
    if (validation.valid && value.length !== 0) {
      setContextValue(value);
      const meetingId = searchParams.get('id');
      if (meetingId && type === 'user') {
        setMeetingName(meetingId);
        setStep(CreateStep.deviceSetup);
      } else {
        nextStep();
      }
    }
  };

  useEnter(() => {
    validateInput(value, next);
  }, value);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    if (!value.length || value.length >= 3) validateInput(value);
    setValue(value.replace(/^\s+/g, ''));
  };

  const isSmartphone = isMobile || isMobileSmall;

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
        <Text
          testID={settings.headerTestId}
          type="H1"
          id={settings.headerId}
          values={{ name: username }}
          color="black"
        />
        <Space mt="xs">
          <Text testID={settings.disclaimerTestId} color="grey.500" id={settings.disclaimerId} />
        </Space>
        <Space mt="l">
          <div ref={myRef}>
            <Input
              labelBackground="white"
              testID={settings.inputTestId}
              label={intl.formatMessage({ id: settings.inputLabel })}
              value={value}
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
            testID={settings.submitButtonTestId}
            variant="primary"
            onClick={next}
            style={{ width: '100%', height: settings.buttonHeight }}
          >
            <Text testID={settings.submitButtonLabelTestId} type="button" id={settings.submitButtonLabel} />
          </Button>
        </Space>
      </Space>
    </Space>
  );
};
