# ParticipantSpeakingIndicator

The ParticipantSpeakingIndicator component is responsible for displaying the speaking state of remote participants.

## Props

| Name                       | Type        | Default | Description                                                              |
| -------------------------- | ----------- | ------- | ------------------------------------------------------------------------ |
| `participant`              | Participant | -       | The object of the selected participant.                                  |
| `activeBackgroundColor`?   | ColorKey    | -       | The background color of the indicator when a participant is talking.     |
| `inactiveBackgroundColor`? | ColorKey    | -       | The background color of the indicator when a participant is not talking. |
| `mutedBackgroundColor`?    | ColorKey    | -       | The background color of the indicator when a participant is muted.       |
| `activeIconColor`?         | ColorKey    | -       | The color of the icon when a participant is talking.                     |
| `inactiveIconColor`?       | ColorKey    | -       | The color of the icon when a participant is not talking.                 |
| `mutedIconColor`?          | ColorKey    | -       | The color of the icon when a participant is muted.                       |
| `testID`?                  | string      | -       | The unique E2E test handler.                                             |

## Examples

### React

```javascript
return (
  <ParticipantSpeakingIndicator
    participant={participant}
    inactiveBackgroundColor="secondary.700"
    inactiveIconColor="red.200"
  />
);
```
