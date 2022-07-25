import { Layout, Spinner } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { useIntl } from 'react-intl';

import { TranslationKeys } from '../../types/translations.types';

import styles from './OverlaySpinner.module.scss';

type OverlaySpinnerProps = {
  textID: TranslationKeys;
};

export const OverlaySpinner = ({ textID }: OverlaySpinnerProps) => {
  const intl = useIntl();
  return (
    <Layout testID="OverlaySpinner" className={styles.overlay}>
      <Spinner textContent={intl.formatMessage({ id: textID })} />
    </Layout>
  );
};
