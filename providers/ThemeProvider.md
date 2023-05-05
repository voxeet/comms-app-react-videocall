# ThemeProvider

Make this UI kit your own by providing a customised theme. The ThemeProvider component can be used to inject this theme into your application.

## Examples

- [Examples](#examples)
  - [Create React App](#create-react-app)

### Create React App

#### Default Theme

To use the default theme, you only need to import `ThemeProvider` and wrap it around your app. No further configuration is needed.

```javascript
// src/App.js

import logo from './logo.svg';
import './App.css';

// 1. Import`ThemeProvider` from the UI kit.
import { ThemeProvider } from '@dolbyio/comms-uikit-react';

// 2. Wrap the existing app code with `ThemeProvider`.
function App() {
  return (
    <ThemeProvider>
      <div className="App">...</div>
    </ThemeProvider>
  );
}

export default App;
```

#### Custom Themes

To customise the theme, we can define a theme object and pass it to the `theme` prop.

```javascript
// src/App.js

import logo from './logo.svg';
import './App.css';

import { ThemeProvider } from '@dolbyio/comms-uikit-react';

function App() {
  // 1. Create an empty object for now.
  const theme = {};

  // 2. Pass it to `theme`. What we provide here will be merged with the default theme, enabling us to override individual theme values.
  return (
    <ThemeProvider theme={theme}>
      <div className="App">...</div>
    </ThemeProvider>
  );
}

export default App;
```

Let's customise a example application using the source code provided [here](../../examples/example_App.js).

```javascript
// examples/example_App.js

import { ThemeProvider } from '@dolbyio/comms-uikit-react';

function App() {
  /*} Example code removed for brevity */

  const theme = {
    colors: {
      // Change the border on the video preview to cyan
      purple: {
        400: 'cyan',
      },
      grey: {
        100: 'cyan', // Change body text and the borders around the Avatar and Select to cyan
        200: 'blue', // Change the border around Select (when open) to blue
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <CommsProvider token={token} refreshToken={refreshToken}>
        <div className="App" style={{ height: 400 }}>
          <Session participantInfo={participantInfo}>
            <Conference id={conferenceId}>{/*} Example code removed for brevity */}</Conference>
          </Session>
        </div>
      </CommsProvider>
    </ThemeProvider>
  );
}

export default App;
```

It's also possible to define multiple, named themes and switch between them.

```javascript
// examples/example_App.js

// 1. Import `ThemeSelect` from the UI kit
import { ThemeProvider, ThemeSelect } from '@dolbyio/comms-uikit-react';

function App() {
  /*} Example code removed for brevity */

  // 2. Define two themes, using the object keys as the theme's name.
  const customThemes = {
    'My Cyan Theme': {
      colors: {
        purple: {
          400: 'cyan',
        },
        grey: {
          100: 'black',
          200: 'cyan',
        },
      },
    },
    'My Pink Theme': {
      colors: {
        purple: {
          400: 'pink',
        },
        grey: {
          100: 'black',
          200: 'pink',
        },
      },
    },
  };

  // 3. Pass these themes to the `customThemes` prop, and add the `ThemeSelect` component anywhere inside of `ThemeProvider`. This will render a dropdown containing built-in themes along the custom themes defined above.
  return (
    <ThemeProvider customThemes={customThemes}>
      <CommsProvider token={token} refreshToken={refreshToken}>
        <div className="App" style={{ height: 400 }}>
          <Session participantInfo={participantInfo}>
            <Conference id={conferenceId}>
              {/*} Example code removed for brevity */}
              <ThemeSelect label="Theme" placeholder="Choose a theme" />
            </Conference>
          </Session>
        </div>
      </CommsProvider>
    </ThemeProvider>
  );
}

export default App;
```
