/* eslint-disable react/jsx-props-no-spreading */
import { Text as UIText, TextProps as UITextProps } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { TextValues, TranslationKeys } from '../../types/translations.types';

type TextProps = {
  id?: TranslationKeys;
  values?: TextValues;
  testID?: string;
} & Partial<UITextProps>;

export const Text = ({ id, values, children, testID, ...rest }: TextProps) => {
  return (
    <UIText testID={testID} {...rest}>
      {id ? <FormattedMessage id={id} values={values || {}} /> : children || null}
    </UIText>
  );
};
