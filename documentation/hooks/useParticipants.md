# useParticipants

The useParticipants hook gathers functions responsible for managing conference participants.

```javascript
import { useParticipants } from '@dolbyio/comms-uikit-react';
```

## Members

| Name                               | Type                                                                                                          | Description                                                                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `participants`                     | [Participant](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-participant)[]               | The list of conference participants.                                                                                             |
| `participantsStatus.isVideo`       | boolean                                                                                                       | Indicates if the selected participant has enabled camera.                                                                        |
| `participantsStatus.isSpeaking`    | boolean                                                                                                       | Indicates if the selected participant is currently speaking.                                                                     |
| `participantsStatus.isLocal`       | boolean                                                                                                       | Indicates if the selected participant is local user.                                                                             |
| `participantsStatus.isRemoteAudio` | boolean                                                                                                       | Indicates if the selected participant is sending audio to the conference i.e. the selected participant has not muted themselves. |
| `participantsStatus.isLocalAudio`  | boolean                                                                                                       | Indicates if local user is receiving audio from selected participant.                                                            |
| `addIsSpeakingListener`            | ([Participant](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-participant)) => () => void | Checks if participant is currently speaking.                                                                                     |

## Examples

### React

### Display list of participants

```javascript
const { participants } = useParticipants();

const ParticipantsDisplayList = () => {
  return participants.map((p) => {
    <p>{p.info.name}</p>;
  });
};
```

### Display speaking indicator if participant is speaking

```javascript
const { participantsStatus } = useParticipants();
const { isSpeaking } = participantsStatus[participant.id] || {};

if (isSpeaking) {
  console.log(participant.info.name, ' is speaking');
}
```

### Display mirrored ViewTile if participant is local user

```javascript
const { participantsStatus, ViewTile } = useParticipants();
const { isLocal } = participantsStatus[participant.id] || {};

<ViewTile participant={participant} isMirrored={isLocal} />;
```

> Note: A specific `participant` from the conference can be accessed via the `participants` member from `useParticipant` hook.
