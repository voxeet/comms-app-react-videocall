import { Input, ValidationType, Button, Space } from '@dolbyio/comms-uikit-react';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import Text from '../../../components/Text';
import useConferenceCreate from '../../../hooks/useConferenceCreate';
import { useEnter } from '../../../hooks/useEnter';
import { useQuery } from '../../../hooks/useQuery';

import styles from './AccessToken.module.scss';

function getExpirationDate(accessToken: string) {
  const token = accessToken.split('.')[1];
  const jwt = JSON.parse(window.atob(token));
  return new Date(jwt.exp * 1000);
}

function isAccessTokenFormatValid(accessToken: string | null) {
  try {
    if (accessToken != null) {
      const token = accessToken.split('.')[1];
      JSON.parse(window.atob(token));
      return true;
    }
  } catch (error) { }

  return false;
}

export const AccessToken = () => {
  const { accessToken, setAccessToken, nextStep } = useConferenceCreate();
  const [validation, setValidation] = useState<ValidationType>({ valid: false });
  const [at, setAT] = useState(accessToken);
  const intl = useIntl();
  const query = useQuery();

  useEffect(() => {
    const at = query.get("token");
    const isValid = isAccessTokenFormatValid(at);
    if (isValid) {
      setAT(at ?? '');
      setValidation({valid: true});
    }
  }, []);

  const next = () => {
    if (validation.valid) {
      setAccessToken(at);

      const accessTokenExpiration = getExpirationDate(at);
      
      console.group('Access Token');
      console.log(`\x1B[94mInitialize the SDK with the Access Token: \x1B[m${at}`);
      console.log(`Access Token Expiration: ${accessTokenExpiration}`);
      console.groupEnd();

      nextStep();
    }
  };

  useEnter(next, at);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setAT(value);

    const isValid = isAccessTokenFormatValid(value);
    if (!isValid) {
      setValidation({
        valid: false,
        message: intl.formatMessage({ id: 'accessTokenValidation' }),
      });
      return;
    }

    try {
      const accessTokenExpiration = getExpirationDate(at);
      if (accessTokenExpiration.getTime() <= new Date().getTime()) {
        setValidation({
          valid: false,
          message: intl.formatMessage({ id: 'accessTokenValidationExpired' }),
        });
        return;
      }
    } catch (error) {
      
    }

    setValidation({
      valid: true,
      message: undefined,
    });
  };

  return (
    <Space className={styles.container}>
      <Text testID="HelloUser" type="H1" id="accessTokenTitle" color="black" />
      <Space mt="xs">
        <Text testID="AccessTokenDisclaimer" color="grey.500" id="accessTokenDisclaimer" />
      </Space>
      <Space mt="l">
        <Input
          testID="AccessTokenInput"
          label={intl.formatMessage({ id: 'accessToken' })}
          value={at}
          onChange={onChange}
          validation={validation}
          autoFocus
        />
      </Space>
      <Space mt="m">
        <Button
          testID="AccessTokenNextButton"
          variant="primary"
          onClick={next}
          disabled={!validation.valid}
          style={{ width: 400, height: 56 }}
        >
          <Text testID="NextButtonText" type="buttonDefault" id="next" />
        </Button>
      </Space>
    </Space>
  );
};
