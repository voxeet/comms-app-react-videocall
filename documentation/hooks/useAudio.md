# useAudio

The useAudio hook gathers functions responsible for managing state of audio transmission.

## Members

| Name                      | Type                    | Description                                     |
| ------------------------- | ----------------------- | ----------------------------------------------- |
| `isAudio`                 | boolean                 | Indicates audio state of local user.            |
| `toggleAudio`             | () => void)             | Toggles audio of local user.                    |
| `startParticipantAudio`   | (Participant) => Promise<void> | Starts receiving audio to local user from selected participant.                       |
| `stopParticipantAudio`    | (Participant) => Promise<void> | Stops receiving audio to local user from selected participant.                        |

## Examples

### React

### Toggle audio transmission of local participant

```javascript
const { toggleAudio } = useParticipants();
...
<button onClick={toggleAudio}>...</button>
```

### Toggle audio receiving of remote participant.

```javascript
const { participantsStatus } = useParticipants();
const { startParticipantAudio, stopParticipantAudio } = useAudio();
const { isLocalAudio, isRemoteAudio } = participantsStatus[participant.id] || {};

<button
  onClick={isLocalAudio ? () => stopParticipantAudio(participant) : () => startParticipantAudio(participant)}
  disabled={!isRemoteAudio}
>
  ...
</button>;
```

### Display mute indicator

```javascript
const { isAudio } = useAudio();

<IconIndicator icon={isAudio ? 'microphone' : 'microphoneOff'} />;
```
