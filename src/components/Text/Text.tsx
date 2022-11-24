import { Text as UIText, TextProps as UITextProps } from '@dolbyio/comms-uikit-react';
import { TextValues, TranslationKeys } from '@src/types/translations';
import React from 'react';
import { FormattedMessage } from 'react-intl';

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
