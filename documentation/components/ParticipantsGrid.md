# ParticipantsGrid

The ParticipantsGrid component is responsible for displaying video streams of active participants in a grid tile layout.

## Props

| Name                | Type    | Default | Description                                                                                   |
| ------------------- | ------- | ------- | --------------------------------------------------------------------------------------------- |
| `localText`         | string  | -       | The preferred text to display next to the local participant's video tile, for example, "You". |
| `localParticipant`? | boolean | true    | Information whether the local participant should be rendered in the layout.                   |
| `testID` ?          | string  | -       | The unique E2E test handler.                                                                  |

## Examples

### React

```javascript
return <ParticipantsGrid localText="you" testID="ParticipantsGrid" />;
```
