# useParticipants

The useParticipants hook gathers functions responsible for managing conference participants.

## Members

| Name                               | Type                           | Description                                                                           |
| ---------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------- |
| `participants`                     | Participant[]                  | The list of conference participants.                                                  |
| `participantsStatus.isVideo`       | boolean                        | Indicates if the selected participant has enabled camera.                                 |
| `participantsStatus.isSpeaking`    | boolean                        | Indicates if the selected participant is currently speaking.                                   |
| `participantsStatus.isLocal`       | boolean                        | Indicates if the selected participant is local user.                                      |
| `participantsStatus.isRemoteAudio` | boolean                        | Indicates if the selected participant is sending audio to the conference i.e. the selected participant has not muted themselves. |
| `participantsStatus.isLocalAudio`  | boolean                        | Indicates if local user is receiving audio from selected participant.                     |
| `addIsSpeakingListener`            | (Participant) => () => void    | Checks if participant is currently speaking.                                               |

## Examples

### React

### Display list of participants

```javascript
const { participants } = useParticipants();

participants.map((p) => {
  return <p>{p.info.name}</p>;
});
```

### Display speaking indicator if participant is speaking

```javascript
const { participantsStatus } = useParticipants();
const { isSpeaking } = participantsStatus[participant.id] || {};

if (isSpeaking) {
    return <SpeakingIndicator>
}

```

### Display mirrored ViewTile if participant is local user

```javascript
const { participantsStatus } = useParticipants();
const { isLocal } = participantsStatus[participant.id] || {};

<ViewTile participant={participant} isMirrored={isLocal} />;
```
