# ParticipantsListItem

The ParticipantsListItem component is responsible for displaying a single participant in the participants list.

## Props

| Name           | Type        | Default | Description                                                                       |
| -------------- | ----------- | ------- | --------------------------------------------------------------------------------- |
| `localText`    | string      | -       | The preferred text displayed as the local participant's name, for example, "You". |
| `muteText`     | string      | -       | The text displayed in the tooltip when a participant is not muted.                |
| `unmuteText`   | string      | -       | The text displayed in the tooltip when a participant is muted.                    |
| `soundOnText`  | string      | -       | The text displayed in the tooltip when a participant is actively talking.         |
| `soundOffText` | string      | -       | The text displayed in the tooltip when a participant is not talking.              |
| `participant`  | Participant | -       | The Participant object.                                                           |
| `testID` ?     | string      | -       | The unique E2E test handler.                                                      |

## Examples

### React

```javascript
return (
  <ParticipantsListItem
    localText="you"
    muteText="mute"
    unmuteText="unmute"
    soundOnText="soundOn"
    soundOffText="soundOff"
    participant={Participant}
  />
);
```
