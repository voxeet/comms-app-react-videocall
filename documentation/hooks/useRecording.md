# useRecording

The useRecording hook gathers functions responsible for managing videocall recording.

```javascript
import { useRecording } from '@dolbyio/comms-uikit-react';
```

## Members

| Name                        | Type                         | Description                                             |
| --------------------------- | ---------------------------- | ------------------------------------------------------- |
| `startRecording`            | () => Promise\<boolean\>     | Starts recording.                                       |
| `stopRecording`             | () => Promise\<boolean\>     | Stops recording.                                        |
| `ownerId`                   | string / null                | ID of the participant who is recording.                 |
| `timestamp`                 | number / null                | The number of seconds from the start of recording.      |
| `isLocalUserRecordingOwner` | boolean                      | Informs if local user is recording owner.               |
| `status`                    | RecordingStatus              | Status of the recording.                                |
| `setRecordingErrors`        | (error?: ErrorCodes) => void | Function for resetting errors or adding specific error. |
| `resetRecordingData`        | () => void                   | Resets recording data for local user.                   |
| `isRecordingModeActive`     | boolean                      | Informs if local user has active recording mode.        |
| `isError`                   | boolean                      | Informs if some error exists in recording.              |

## Examples

### React

### Check if recording is active

```javascript
const { isLocalUserRecordingOwner, isRecordingModeActive, status } = useRecording();

const isRecordingActive = status === RecordingStatus.Active || (isLocalUserRecordingOwner && isRecordingModeActive);
```

### Start / Stop recording

```javascript
import { useRecording, RecordingStatus } from '@dolbyio/comms-uikit-react';
const { startRecording, stopRecording, status: recordingStatus, isLocalUserRecordingOwner } = useRecording();

// Refer to example above
const isRecordingActive = isLocalUserRecordingOwner || recordingStatus === RecordingStatus.Active;

const RecordingButton = () => {
  const toggleRecord = () => {
    if (isRecordingActive) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return <button onClick={toggleRecord}>{isRecordingActive ? 'Stop Recording' : 'Start Recording'}</button>;
};
```

### Find participant object based on ownerId

```javascript
const { ownerId } = useRecording();
const { participants } = useParticipants();

const participant = participants.find((participant) => participant.id === ownerId);
```

### Check timestamp of start of recording

```javascript
const { timestamp } = useRecording();

console.log(timestamp);
```
