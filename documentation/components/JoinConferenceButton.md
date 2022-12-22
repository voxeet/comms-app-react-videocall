# JoinConferenceButton

The JoinConferenceButton component is responsible for creating and joining an active conference by using the SDK create and join methods.
While joining the conference , SDK session should be already opened with

```javascript
sessionService.openSession(participantInfo: ParticipantInfo)
```

## Props

| Name               | Type                           | Default | Description                                                                            |
|--------------------|--------------------------------|---------|----------------------------------------------------------------------------------------|
| `joinOptions`      | JoinOptions                    | -       | An object representing the desired configuration of the conference.                    |
| `meetingName`      | string                         | -       | The name of the meeting. This will be automatically assigned to the conference object. |
| `tooltipText`      | string                         | -       | The text to display in the Tooltip component.                                          |
| `tooltipPosition`? | TooltipProps['position']       | top     | The position of the Tooltip component.                                                 |
| `onInitialise`?    | () => void                     | -       | A function to execute when join action is initiated (but not completed).               |
| `onSuccess`?       | (conferenceId: string) => void | -       | A function to execute when join action successfully returns.                           |
| `testID` ?         | string                         | -       | The unique E2E test handler.                                                           |

## Examples

### React

```javascript
const joinOptions = {
  constraints: {
    audio: true,
    video: true,
  },
};

const meetingName = 'My Meeting';
const tooltipText = 'Join meeting';

const onInitialise = (conferenceId) => {
  /* Optional callback when attempting to join a call - can be used to (for example) toggle UI loading state */
};

const onSuccess = (conferenceId) => {
  /* Do something with the conference ID, eg. store it in local state and pass it to <Conference /> */
};

return (
  <JoinConferenceButton
    testID="JoinConferenceButton"
    meetingName={meetingName}
    joinOptions={joinOptions}
    tooltipText={tooltipText}
    onInitialise={onInitialise}
    onSuccess={onSuccess}
  />
);
```
