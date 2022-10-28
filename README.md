# Dolby.io Communications Video Call React App

## Video Call App

The application available in this repository demonstrates the capabilities of Dolby.io's video call solution for browser applications, built using React.

This repository demonstrates how to develop the core Dolby.io features and also provides an understanding of how our service works. If you run into problems, the full Dolby.io Communications SDK for JavaScript documentation can be found at <https://docs.dolby.io/communications-apis/docs/js-overview>.

The application provided allows you to evaluate solutions offered by Dolby.io Communications APIs. You can download the repository yourself, run the application locally and verify that it meets your requirements. If you are interested in more details about Dolby.io’s video conference call capabilities, more information can be found here:
<https://dolby.io/products/video-call/>

Its scope covers:

- Initialization of Dolby.io SDK
- Creating and joining a conference
- Camera, microphone and audio output configuration
- Full conference view with grid display of user streams
- Basic video conferencing interactions (muting, camera switching)
- Screen sharing
- Recording
- Background blur (available only on desktop Chrome and Edge)

## Getting Started

The steps below will quickly get you started testing Dolby.io’s capabilities.

### How to get a Dolby.io account

Dolby.io Communications APIs requires you to create a Dolby.io account.
To set it up, you need to go to <https://dashboard.dolby.io/signup/> and complete the form. After confirming your email address, you will be logged in.

### Dolby.io dashboard

After logging in, you get access to the full dashboard where you can manage your account.

From this page <https://dashboard.dolby.io/dashboard/applications/summary> you can manage your profile and billing.

### How to obtain access token

To run the application, you need to generate a special access token and paste it into the source code of the app. Go to the _Dashboard_, and find the _Launch Demos_ button. On the next screen, there is a token field where you can copy the client access token to your clipboard. The generated token is active for 12 hours.

## How to run the Video Conferencing app

Below is a list of steps necessary to run the application locally.

### Clone repository

Use git to clone the repository with
`git clone git@github.com:dolbyio-samples/comms-app-react-videoconference.git`
or simply download using the green button on the top of this page and unzip the repository.

### Install dependencies

Open the main directory with the terminal. If you are using [Yarn](https://yarnpkg.com/), install dependencies with the following command:

```bash
yarn
```

and if you are using [NPM](https://www.npmjs.com/), type the following command:

```bash
npm install
```

### Paste the token

Open file [src/App.tsx](./src/App.tsx), find line 23 and replace `{YOUR_TOKEN}` with your access token string, prepared previously in [this step](#how-to-obtain-access-token). It should look like this:

```javascript
  return (
    <TranslationProvider>
      <ConferenceCreateProvider>
        <CommsProvider token="bGciOiJIUzUxMiJ9.eyJOTQxMywic3V...23r2fsdvsdfsfdsvfd">
          <...>
        </CommsProvider>
      </ConferenceCreateProvider>
    </TranslationProvider>
  );
```

### Start the app

After installing the dependencies, execute the following command:

```bash
yarn dev
```

or

```bash
npm run dev
```

to run the application locally.

### Open the app in a browser

After printing the appropriate message in the terminal window, open <http://localhost:3000> in the browser. The application will launch at this address.

## How to build the Video Conferencing app

Follow the steps of installing dependencies & token configuration from the "How to run the Video Conferencing app" section

After installing the dependencies, execute the following command:

`yarn build`

This command generated distribution packages in `/dist` directory.

#### Base URL configuration

In case you need to serve production content from different path then `/` root, (e.g. extend example.app to example.app/videoconference/) please add the `/.env.production` file with the following content:

```
BASE_URL=<YOUR BASE URL PATH>
```

More about Base URL configuration can be found [here](https://vitejs.dev/config/shared-options.html#base).

## Known issues & limitations

- Speaker selection is available only on Chrome
- Copy conference link works only for root directories by default
- In some cases entering a conference may take more than three seconds
- On Safari 15.4 and below, the local user can hear echo

## Requirements & supported platforms

### Video Conference Call App supports 4 main browsers:

- Chrome 100+
- Safari 15+
- Firefox 100+
- Edge 100+
