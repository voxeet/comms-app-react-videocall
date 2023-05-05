# ParticipantName

The ParticipantName component is responsible for displaying a remote participant's name in the ParticipantGrid component.

## Props

| Name            | Type               | Default | Description                                    |
| --------------- | ------------------ | ------- | ---------------------------------------------- |
| `participant`   | Participant        | -       | The object of the selected participant.        |
| `...PillProps`? | Partial(PillProps) | -       | Props that will be passed to the root element. |

## Examples

### React

```javascript
return <ParticipantName participant={participant} />;
```
