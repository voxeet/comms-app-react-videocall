import { CommsProvider, ThemeProvider, LogProvider, NotificationCenter, LogLevel } from '@dolbyio/comms-uikit-react';
import VoxeetSDK from '@voxeet/voxeet-web-sdk';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import PhoneLandscapeCurtain from './components/PhoneLandscapeCurtain';
import TranslationProvider from './components/TranslationProvider';
import './App.module.scss';
import { ConferenceCreateProvider } from './context/ConferenceCreateContext';
import useToken from './hooks/useToken';
import { Navigator } from './routes/Navigator';

const App = () => {
  // Register the component name so that we can estimate the app's usage
  useEffect(() => {
    VoxeetSDK.registerComponentVersion(import.meta.env.VITE_APP_NAME, import.meta.env.VITE_APP_VERSION);
  }, []);

  const { YOUR_TOKEN, getToken } = useToken();

  if (!YOUR_TOKEN) {
    return null;
  }

  return (
    <LogProvider minLogLevel={LogLevel.warn}>
      <TranslationProvider>
        <ConferenceCreateProvider>
          <CommsProvider
            token={YOUR_TOKEN}
            refreshToken={getToken}
            packageUrlPrefix={`${window.location.origin}${import.meta.env.BASE_URL}assets/wasm/`}
          >
            <ThemeProvider
              customThemes={{
                'My Theme': { colors: { white: 'yellow', primary: { 400: 'red' }, secondary: { 400: 'blue' } } },
              }}
            >
              <Navigator />
              {/* Because of the problem with resize / orientation change events , we need to lock android chrome landscape mode* /}
              {/* for mobile devices */}
              <PhoneLandscapeCurtain />
              <NotificationCenter position="top-center" />
            </ThemeProvider>
          </CommsProvider>
        </ConferenceCreateProvider>
      </TranslationProvider>
    </LogProvider>
  );
};

const container = document.getElementById('root');
// no-non-null-assertion comes from official react docs
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
