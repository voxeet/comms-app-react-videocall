# useRecording

The useRecording hook gathers functions responsible for managing videocall recording.

## Members

| Name                        | Type                         | Description                                             |
| --------------------------- | ---------------------------- | ------------------------------------------------------- |
| `startRecording`            | () => Promise<boolean>       | Starts recording.                                       |
| `stopRecording`             | () => Promise<boolean>       | Stops recording.                                        |
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

### Start recording

```javascript
const { startRecording } = useRecording();

await startRecording();
```

### Stop recording

```javascript
const { stopRecording } = useRecording();

await stopRecording();
```

### Find participant object based on ownerId

```javascript
const { ownerId } = useRecording();
const { participants } = useParticipants();

const participant = participants.find((p) => participant.id === ownerId);
```

### Check timestamp of start of recording

```javascript
const { timestamp } = useRecording();

console.log(timestamp);
```

### Define if recording mode is active based on status or isLocalUserRecordingOwner and isPresentationModeActive

```javascript
const { isLocalUserRecordingOwner, isPresentationModeActive, status } = useRecording();

const isRecordingActive = status === RecordingStatus.Active || (isLocalUserRecordingOwner && isRecordingModeActive);
```
