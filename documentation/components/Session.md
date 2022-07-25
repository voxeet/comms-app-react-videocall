# Session

The Session component is responsible for opening a new session on component mount with given props.

## Props

| Name              | Type            | Default | Description                             |
| ----------------- | --------------- | ------- |-----------------------------------------|
| `participantInfo` | ParticipantInfo | -       | Participant info used to open session   |
| `children`        | React.ReactNode | -       | The children element.                   |

## Examples

### React

```javascript
return (
  <Session>
    <div>children element</div>
  </Session>
);
```
