# ParticipantVideo

The ParticipantVideo component is responsible for displaying participants' video streams.

## Props

| Name                 | Type                    | Default | Description                                    |
| -------------------- | ----------------------- | ------- | ---------------------------------------------- |
| `participant`        | Participant             | -       | The object of the selected participant.        |
| `...VideoViewProps`? | Partial(VideoViewProps) | -       | Props that will be passed to the root element. |

## Examples

### React

```javascript
return <ParticipantVideo participant={participant} />;
```
