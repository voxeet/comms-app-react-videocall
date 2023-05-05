# useAudio

The useAudio hook gathers functions responsible for managing state of audio transmission.

```javascript
import { useAudio } from '@dolbyio/comms-uikit-react';
```

## Members

| Name                        | Type                                                                                                               | Description                                                                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `isAudio`                   | boolean                                                                                                            | Indicates audio state of local user.                                                                                                 |
| `toggleAudio`               | () => void                                                                                                         | Toggles audio of local user.                                                                                                         |
| `startParticipantAudio`     | ([Participant](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-participant)) => Promise\<void\> | Starts receiving audio to local user from selected participant.                                                                      |
| `stopParticipantAudio`      | ([Participant](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-participant)) => Promise\<void\> | Stops receiving audio to local user from selected participant.                                                                       |
| `playBlockedAudio`          | () => Promise\<void\>                                                                                              | Enables receiving audio from conference participants if a user joins as a listener.[Safari only]                                     |
| `blockedAudioState`         | BlockedAudioState                                                                                                  | Check if Enable blocked audio. States "inactivated" and "activated" are connected with used browser and permissions. [Safari only]   |
| `markBlockedAudioEnabled`   | () => void                                                                                                         | Sets blockedAudioState as enabled if the user enables remote audio. [Safari only]                                                    |
| `markBlockedAudioActivated` | () => void                                                                                                         | Sets `blockedAudioState` as activated. It helps the user to show some pop up with allow audio request without adding separate flags. |
| `toggleMuteParticipants`    | () => void                                                                                                         | Change the mute status for all participants except local user                                                                        |
| `isPageMuted`               | boolean                                                                                                            | Indicates if all participants except local are muted                                                                                 |

## Examples

### React

### Toggle audio transmission of local participant

```javascript
const { toggleAudio } = useAudio();

<button onClick={toggleAudio}>...</button>;
```

### Toggle audio receiving of remote participant.

```javascript
import { useParticipant } from '@dolbyio/comms-uikit-react';

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
import { UseAudio, IconIndicator } from '@dolbyio/comms-uikit-react';

const { isAudio } = useAudio();

<IconIndicator icon={isAudio ? 'microphone' : 'microphoneOff'} />;
```
