# useLiveStreaming

The useLiveStreaming hook gathers functions responsible for managing Live Streaming.

### Important

Live Streaming can only be started and stopped through the api call to dedicated backend service, which has to be created by the user. Example backend service can be found [here](https://github.com/dolbyio-samples/comms-app-react-videocall/api). // CHANGE TO PROPER GITHUB REPO!
The SDK itself doesn't provide methods for this.

## Members

| Name                            | Type                                                | Description                                                                                 |
| ------------------------------- | --------------------------------------------------- |---------------------------------------------------------------------------------------------|
| `owner`                         | Participant                                         | The object of the participant who started the live stream.                                  |
| `startLiveStreaming`            | (start: () => Promise<boolean>) => Promise<boolean> | Starts Live Streaming. User has to pass his own start method connected with backend service |
| `stopLiveStreaming`             | (stop: () => Promise<boolean>) => Promise<boolean>; | Stops Live Streaming. User has to pass his own start method connected with backend service  |
| `isLiveStreamingModeActive`     | boolean                                             | Informs if local user has active Live Streaming mode.                                       |
| `isLocalUserLiveStreamingOwner` | boolean                                             | Informs if local user is live stream owner.                                                 |
| `status`                        | Status                                              | Current live stream status                                                                  |
| `resetLiveStreamingData`        | () => void                                          | Resets data of Live Streaming for local user.                                               |
| `timestamp`                     | number / null                                       | Informs when Live Streaming started.                                                        |
| `provider`                      | 'youtube' / 'facebook' / 'twitch' / null            | Informs where user is Live Streaming, if it can be determined from rtmp url                 |
| `setLiveStreamingErrors`        | (error?: ErrorCodes) => void                        | Function for resetting errors or adding specific error.                                     |
| `isError`                       | boolean                                             | Informs if any live stream error occurs.                                                    |

## Examples

### React

### Start Live Streaming

```javascript
const { startLiveStreaming } = useLiveStreaming();

const startOnBackend = async () => {
  const res = await fetch(`http://backend.com/start`, {
    method: 'POST',
  });
  return res;
};

await startLiveStreaming(startOnBackend);
```

### Stop Live Streaming

```javascript
const { stopLiveStreaming } = useLiveStreaming();

const stopOnBackend = async () => {
  const res = await fetch(`http://backend.com/stop`, {
    method: 'POST',
  });
  return res;
};

await stopLiveStreaming(stopOnBackend);
```

### Display Live Streaming owner name

```javascript
const { owner } = useLiveStreaming();

<Text>{`${owner.info.name} is Live Streaming ...`}</Text>;
```
