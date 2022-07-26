import { CommsProvider, ThemeProvider } from '@dolbyio/comms-uikit-react';

import useConferenceCreate from './hooks/useConferenceCreate';

const Call = () => {
  const { accessToken } = useConferenceCreate();

  return (
    <CommsProvider token={accessToken}>
      <ThemeProvider
          customThemes={{
          'My Theme': { colors: { white: 'yellow', primary: { 400: 'red' }, secondary: { 400: 'blue' } } },
          }}
      >
        <p>{accessToken}</p>
      </ThemeProvider>
    </CommsProvider>
  );
};

export default Call;
