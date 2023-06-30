# Additional Configuration and customization Options for the Video Call App

## Changing the labels in the app

To change the labels in the app, you can modify [en.json](src/translations/en.json) and change the labels as necessary.
To add a new string, add a new key-value pair to the JSON file. You can then reference that new key in the code as follows:

```javascript

// en.json
{
    //... other keys
    "yourNewKey" : "your new value",
}

// your own code file
import {Text} from '@dolbyio/comms-uikit-react';

<Text labelKey="yourNewKey" type="H2" />

```

## Base URL configuration

In the event that you need to serve production content from a path other than `/` root, (e.g. extend example.app to example.app/videoconference/) please add the `/.env.production` file with the following content:

```bash
BASE_URL=<YOUR BASE URL PATH>
```

Additional information about Base URL configuration can be found [here](https://vitejs.dev/config/shared-options.html#base).

## Setting up music mode

1. In the project root folder, add the following variable in `.env` file:

```env
VITE_MUSIC_MODE=true
```

You can learn more about music mode on our [docs pages](https://docs.dolby.io/communications-apis/docs/guides-music-mode) 2. To start the application run the following command in the **root** directory

```bash
yarn dev
```

## Using live streaming features

In order to use live streaming features, you need to run an additional proxy server so that POST methods can be properly handled. An example of such a server is placed in the [/backend](backend/) folder.

> If your application has been started in previous steps, please kill the process and proceed with instructions below.

### Setting up live streaming

1. In the project root folder's `.env` file set the following variable

```env
VITE_RTMP_STREAMING=true
```

> You can set any value for port and hostname in the .env files, as long as they are the same.

## Customizing the App Theme

The app theme is controlled by the [Dolby.io UI Kit](https://www.npmjs.com/package/@dolbyio/comms-uikit-react). Refer to [this guide](https://github.com/DolbyIO/comms-uikit-react/blob/main/documentation/providers/ThemeProvider.md) on how to stylize your app.

## Customizing the viewer layout

You can re-arrange the rendered layout for your live stream viewers by configuring the Communications API Mixer app. A mixer app is a web app based on the Dolby.io communications APIs that composes multiple streams of videos into a single stream and passes that on to any RTMP or webRTC based consumer. Refer to this [blog](https://dolby.io/blog/creating-a-custom-mixer-layout-for-streaming-a-conference/) for more details.
