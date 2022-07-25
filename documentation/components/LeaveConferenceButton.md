# LeaveConferenceButton

The LeaveConferenceButton component is responsible for leaving an active conference by using the SDK leave method.

## Props

| Name               | Type                     | Default | Description                                                   |
| ------------------ | ------------------------ | ------- | ------------------------------------------------------------- |
| `tooltipText`      | string                   | -       | The text to display in the Tooltip component.                 |
| `tooltipPosition`? | TooltipProps['position'] | top     | The position of the Tooltip component.                        |
| `onSuccess`?       | () => void               | -       | A function to execute when leave action successfully returns. |
| `testID` ?         | string                   | -       | The unique E2E test handler.                                  |

## Examples

### React

```javascript
const onSuccess = () => {
  navigate('conference');
};

return <LeaveConferenceButton testID="LeaveConferenceButton" tooltipText="Leave conference" onSuccess={onSuccess} />;
```
