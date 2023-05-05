# useRealTimeStreaming

The useRealTimeStreaming hook gathers functions responsible for managing [Real-Time streaming](https://docs.dolby.io/communications-apis/reference/introduction-to-streaming-api) service, Dolby.IO's ultra low latency streaming offering.

```javascript
import { useRealTimeStreaming } from '@dolbyio/comms-uikit-react';
```

### Important

Real-time streaming can only be started and stopped via API calls to a dedicated backend service, which the user needs to setup. An example implementation of the backend service can be found [here](https://github.com/dolbyio-samples/comms-app-react-events/blob/main/api-proxy).

> Note: The SDK itself doesn't provide any methods for connecting to the API service, it is up to the user to configure the proxy service URL and then leverage this hook for starting and stopping the service.

## Members

| Name                 | Type                     | Description                     |
| -------------------- | ------------------------ | ------------------------------- |
| `startLiveStreaming` | () => Promise\<boolean\> | Starts real-time streaming      |
| `stopLiveStreaming`  | () => Promise\<boolean\> | Stops real-time streaming       |
| `isLive`             | boolean                  | Indicates if the stream is live |

## Examples

### React

### Start real-time streaming

```javascript
// you need to get the base url of proxy server beforehand
const { startRealTimeStreaming } = useRealTimeStreaming(proxyBaseUrl);

try {
  await startRealTimeStreaming();
} catch (error) {
  // handle error
}
```

### Stop Live Streaming

```javascript
// you need to get the base url of proxy server beforehand and configure it in order to use this hook.
// Check out our implementation in the Dolby.io events app https://github.com/dolbyio-samples/comms-app-react-events/tree/main/api-proxy
// on how a backend service can be setup
const { stopRealTimeStreaming } = useRealTimeStreaming(proxyBaseUrl);

try {
  await stopRealTimeStreaming();
} catch (error) {
  // handle error
}
```
