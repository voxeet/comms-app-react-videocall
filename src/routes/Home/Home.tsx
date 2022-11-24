import Text from '@components/Text';
import { Layout } from '@dolbyio/comms-uikit-react';
import React from 'react';

export const Home = () => {
  return (
    <Layout testID="HomeRoute">
      <Text id="home" />
    </Layout>
  );
};
