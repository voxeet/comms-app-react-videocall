# useAudio

The useAudio hook gathers functions responsible for managing state of audio transmission.

## Members

| Name                        | Type                           | Description                                                                                                                       |
|-----------------------------|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `isAudio`                   | boolean                        | Indicates audio state of local user.                                                                                              |
| `toggleAudio`               | () => void)                    | Toggles audio of local user.                                                                                                      |
| `startParticipantAudio`     | (Participant) => Promise<void> | Starts receiving audio to local user from selected participant.                                                                   |
| `stopParticipantAudio`      | (Participant) => Promise<void> | Stops receiving audio to local user from selected participant.                                                                    |
| `playBlockedAudio`          | () => Promise<void>            | Enables receiving audio from conference participants is user joins as listener on Safari browser                                  |
| `blockedAudioState`         | BlockedAudioState              | Check if Safari user enabled blocked audio. States "inactivated" and "activated" are connected with used browser and permissions. |
| `markBlockedAudioEnabled`   | () => void                     | Sets blockedAudioState as enabled if Safari user enable remote audio.                                                             |
| `markBlockedAudioActivated` | () => void                     | Sets blockedAudioState as activated, it helps user to show some pop up with allow audio request withoud adding separated flag.    |
| `toggleMuteParticipants`    | () => void                     | Changing mute status for all participants excluding local user                                                                    |
| `isPageMuted`               | boolean                        | Indicates if all participants except local are muted                                                                              | 
## Examples

### React

### Toggle audio transmission of local participant

```javascript
const { toggleAudio } = useParticipants();

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
