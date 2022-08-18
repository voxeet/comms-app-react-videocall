import { Input, ValidationType, Button, Space, useTheme } from '@dolbyio/comms-uikit-react';
import React, { useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import Text from '../../../components/Text';
import useConferenceCreate from '../../../hooks/useConferenceCreate';
import { useEnter } from '../../../hooks/useEnter';
import { isValid } from '../../../utils/validation.util';

import styles from './MeetingName.module.scss';

type MeetingNameProps = {
  inputAutoFocus?: boolean;
  setInputAsFocused: () => void;
  setInputAsUnfocused: () => void;
};

const paddingTopSizes = {
  null: 0,
  small: 24,
  large: 88,
};

export const MeetingName = ({ inputAutoFocus = true, setInputAsFocused, setInputAsUnfocused }: MeetingNameProps) => {
  const { username, meetingName, setMeetingName, nextStep } = useConferenceCreate();
  const [validation, setValidation] = useState<ValidationType>({ valid: true });
  const [name, setName] = useState(meetingName);
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
        <Text testID="HelloUser" type="H1" id="hiName" values={{ name: username }} color="black" />
        <Space mt="xs">
          <Text testID="MeetingTitleDisclaimer" color="grey.500" id="meetingTitleDisclaimer" />
        </Space>
        <Space mt="l">
          <div ref={myRef}>
            <Input
              testID="MeetingNameInput"
              label={intl.formatMessage({ id: 'meetingTitle' })}
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
            testID="MeetingNameJoinButton"
            variant="primary"
            onClick={next}
            disabled={!validation.valid || name.length === 0}
            style={{ width: '100%', height: 56 }}
          >
            <Text testID="JoinButtonText" type="buttonDefault" id="join" />
          </Button>
        </Space>
      </Space>
    </Space>
  );
};
