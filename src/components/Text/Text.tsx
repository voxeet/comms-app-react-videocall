import { Text as UIText, TextProps as UITextProps } from '@dolbyio/comms-uikit-react';
import { TextValues, TranslationKeys } from '@src/types/translations';
import React from 'react';
import { FormattedMessage } from 'react-intl';

type TextProps = {
  labelKey?: TranslationKeys;
  values?: TextValues;
  testID?: string;
} & Partial<UITextProps>;

export const Text = ({ labelKey, values, children, testID, ...rest }: TextProps) => {
  return (
    <UIText testID={testID} {...rest}>
      {labelKey ? <FormattedMessage id={labelKey} values={values || {}} /> : children || null}
    </UIText>
  );
};
