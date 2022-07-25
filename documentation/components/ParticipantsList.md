# ParticipantsList

The ParticipantsList component is responsible for displaying a list with all active participants.

## Props

| Name           | Type   | Default | Description                                                                       |
| -------------- | ------ | ------- | --------------------------------------------------------------------------------- |
| `localText`    | string | -       | The preferred text displayed as the local participant's name, for example, "You". |
| `muteText`     | string | -       | The text displayed in the tooltip when a participant is not muted.                |
| `unmuteText`   | string | -       | The text displayed in the tooltip when a participant is muted.                    |
| `soundOnText`  | string | -       | The text displayed in the tooltip when a participant is actively talking.         |
| `soundOffText` | string | -       | The text displayed in the tooltip when a participant is not talking.              |
| `testID` ?     | string | -       | The unique E2E test handler.                                                      |

## Examples

### React

```javascript
return (
  <ParticipantsList localText="you" muteText="mute" unmuteText="unmute" soundOnText="soundOn" soundOffText="soundOff" />
);
```
