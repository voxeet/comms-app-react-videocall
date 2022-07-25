import { Layout } from '@dolbyio/comms-uikit-react';
import React from 'react';

import Text from '../../components/Text';

export const Home = () => {
  return (
    <Layout testID="HomeRoute">
      <Text id="home" />
    </Layout>
  );
};
