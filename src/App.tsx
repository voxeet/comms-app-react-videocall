import { CommsProvider, ThemeProvider } from '@dolbyio/comms-uikit-react';
import React from 'react';
import { createRoot } from 'react-dom/client';

import './App.module.scss';
import TranslationProvider from './components/TranslationProvider';
import { ConferenceCreateProvider } from './context/ConferenceCreateContext';
import { Navigator } from './routes/Navigator';

const App = () => {
  return (
    <TranslationProvider>
      <ConferenceCreateProvider>
        <CommsProvider token={YOUR_TOKEN}>
          <ThemeProvider
            customThemes={{
              'My Theme': { colors: { white: 'yellow', primary: { 400: 'red' }, secondary: { 400: 'blue' } } },
            }}
          >
            <Navigator />
          </ThemeProvider>
        </CommsProvider>
      </ConferenceCreateProvider>
    </TranslationProvider>
  );
};

const container = document.getElementById('root');
// no-non-null-assertion comes from official react docs
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
