# useScreenSharing

The useScreenSharing hook gathers functions responsible for managing screen sharing.

```javascript
import { useScreenSharing } from '@dolbyio/comms-uikit-react';
```

## Members

| Name                           | Type                                         | Description                                                        |
| ------------------------------ | -------------------------------------------- | ------------------------------------------------------------------ |
| `startScreenShare`             | () => {}                                     | Starts screen sharing. Function available only on desktop devices. |
| `stopScreenShare`              | () => {}                                     | Stops screen sharing. Function available only on desktop devices.  |
| `owners`                       | Map<Participant, MediaStreamWithType / null> | A map of the participant and the stream which sharing screen.      |
| `isLocalUserPresentationOwner` | boolean                                      | Informs if local user is presentation owner.                       |
| `firstPresenter`               | Participant / null                           | First participant who is presenting.                               |
| `status`                       | Status                                       | Current share status                                               |
| `isPendingTakeoverRequest`     | boolean                                      | Informs if local user has pending takeover request.                |
| `setPendingTakeoverRequest`    | (boolean) => void                            | Changes pending takeover request status.                           |
| `permissionError`              | boolean                                      | True while there is no permission for browser                      |
| `sharingInProgressError`       | boolean                                      | True while trying share while sharing is already in Progress       |
| `setSharingErrors`             | ()=> void                                    | Handler to remove ScreenSharing related errors                     |
| `isPresentationModeActive`     | boolean                                      | Informs if local user has active presentation mode.                |
| `resetScreenSharingData`       | () => void                                   | Resets data of screen sharing for local user.                      |
| `isAutoStartShareError`        | boolean                                      | Informs if a browser problem with auto start screen share exists.  |
| `isLackOfBrowserPermissions`   | boolean                                      | Informs if exists browser problem with auto start screen share.    |

## Examples

### React

### Start screen share

```javascript
const { startScreenShare } = useScreenSharing();

<button onClick={() => startScreenShare()}>...</button>;
```

### Stop screen share

```javascript
const { stopScreenShare } = useScreenSharing();

<button onClick={() => stopScreenShare()}>...</button>;
```

### Display presentation owner name

```javascript
const { owner } = useScreenSharing();

<Text>{`${owner.info.name} is presenting ...`}</Text>;
```

> Read more on `Participant` model [here](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-participant)

### Mark stream status in action bar

```javascript
import { useScreenSharing } from '@dolbyio/comms-uikit-react';

const { status } = useScreenSharing();

<Space>{status === 'active' ? <div className="greenDot" /> : <div className="redDot" />}</Space>;
```

> Values for `status` include `"active"`, `"loading"`, `"error"`, or `"other"`.

### Attach stream to video

```javascript
const { stream } = useScreenSharing();

const videoRef = useRef < HTMLVideoElement > null;

videoRef.current.srcObject = stream;
```

### Check if error exists

```javascript
const { status, permissionError } = useScreenSharing();

const isError = status === ShareStatus.Error;
const isSystemPermissionError = permissionError;
```
