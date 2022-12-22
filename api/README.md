# Dolby.io Communications Example Authorisation and Communications proxy

Use this proxy server sample code to connect your Dolby.io communications API based project to our backend services and correctly handle POST requests for features such as starting and stopping RTMP streams.

> **IMPORTANT! we cannot use demo APP_KEY**

## Setup

**note** This guide is written with [Yarn](https://yarnpkg.com) in mind.

1. Go to the `/api` directory and run following command to install all necessary dependencies:

```bash
yarn
```

2. In the `/api` directory, create an `.env` file and fill it with the following properties.

```bash
PORT=4000
KEY=APP_KEY
SECRET=APP_SECRET
HOSTNAME=localhost
```

Your `APP_KEY` and `APP_SECRET` can be found in your Dolby.io dashboard, under the app section. **Do not** wrap them in quote marks.

![Keys and secrets](../documentation/assets/app_keys.png)

3. You can start the proxy server by running the following command.

```bash
yarn dev
```

4. Observe the traffic on your terminal window. Once the live stream feature is enabled in the app, ensure you can see logs pertaining to `start` and `stop` and HTTP response codes to indicate a successful connection.

```bash
[0] 2:28:03 pm - Found 0 errors. Watching for file changes.
[1] Debugger listening on ws://127.0.0.1:9229/ee1f05df-66b8-44c9-b99c-e4952c0d7641
[1] For help, see: https://nodejs.org/en/docs/inspector
[1] Debugger listening on ws://127.0.0.1:9229/13a22631-75dd-4bb1-85ee-37f1a168cbb9
[1] For help, see: https://nodejs.org/en/docs/inspector
[1] Listening at http://localhost:4000/
[1] [POST] 200 - https://api.dolby.io/v1/auth/token
[1] [POST] 200 - https://comms.api.dolby.io/v2/conferences/mix/your-conference-id/rtmp/start
[1] [POST] 200 - https://api.dolby.io/v1/auth/token
[1] [POST] 200 - https://comms.api.dolby.io/v2/conferences/mix/your-conference-id/rtmp/stop
```
