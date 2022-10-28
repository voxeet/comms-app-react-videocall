# RestParticipantsTile

The RestParticipantsTile component is responsible for displaying a grid block with the amount of participants which didn't fit into the max of participants.

## Props

| Name           | Type          | Default | Description                                           |
| -------------- | ------------- | ------- | ----------------------------------------------------- |
| `participants` | Participant[] | -       | The array of participants which didn't fit into grid. |
| `testID`?      | string        | -       | The unique E2E test handler.                          |

## Examples

### React

```javascript
return <RestParticipantsTile participants={participants} />;
```
