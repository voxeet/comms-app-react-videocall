# ParticipantQualityIndicator

The ParticipantQualityIndicator component is responsible for displaying connection quality indicators of remote participants.

## Props

| Name                        | Type                           | Default | Description                                    |
| --------------------------- | ------------------------------ | ------- | ---------------------------------------------- |
| `participant`               | Participant                    | -       | The object of the selected participant.        |
| `...QualityIndicatorProps`? | Partial(QualityIndicatorProps) | -       | Props that will be passed to the root element. |

## Examples

### React

```javascript
return <ParticipantQualityIndicator participant={participant} />;
```
