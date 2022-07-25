# useParticipants

The useParticipants hook gathers functions responsible for managing conference participants.

## Members

| Name                               | Type                           | Description                                                                           |
| ---------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------- |
| `participants`                     | Participant[]                  | The list of conference participants.                                                  |
| `participantsStatus.isVideo`       | boolean                        | Indicates if selected participant has enabled camera.                                 |
| `participantsStatus.isSpeaking`    | boolean                        | Indicates if selected participant currently speaks.                                   |
| `participantsStatus.isLocal`       | boolean                        | Indicates if selected participant is local user.                                      |
| `participantsStatus.isRemoteAudio` | boolean                        | Indicates if selected participant send audio to conference - is not muted by himself. |
| `participantsStatus.isLocalAudio`  | boolean                        | Indicates if local user receives audio from selected participant.                     |
| `addIsSpeakingListener`            | (Participant) => () => void    | Checks if participant currently speaks.                                               |

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

### Display mirrored VideoView if participant is local user

```javascript
const { participantsStatus } = useParticipants();
const { isLocal } = participantsStatus[participant.id] || {};

<VideoView participant={participant} isMirrored={isLocal} />;
```
