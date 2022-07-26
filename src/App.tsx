import React from 'react';
import { createRoot } from 'react-dom/client';

import './App.module.scss';
import TranslationProvider from './components/TranslationProvider';
import { ConferenceCreateProvider } from './context/ConferenceCreateContext';
import { Navigator } from './routes/Navigator';
import Call from './Call';

const App = () => {
  return (
    <TranslationProvider>
      <ConferenceCreateProvider>
        <Navigator>
          <Call />
        </Navigator>
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
