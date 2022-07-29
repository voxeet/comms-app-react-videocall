# Conference

The Conference component is responsible for creating and joining conferences on component mount with given props.

## Props

| Name       | Type            | Default | Description                                                                 |

| Name            | Type            | Default | Description                                                                 |
| --------------- | --------------- | ------- | --------------------------------------------------------------------------- |
| `id`            | string          | -       | Identifier of the conference to join.                                       |
| `alias`         | string          | -       | The alias of the conference.                                                |
| `liveRecording` | boolean         | -       | Turns the live recording on or off.                                         |
| `audio`         | boolean         | -       | A boolean that indicates whether audio should be enabled in the conference. |
| `video`         | boolean         | -       | A boolean that indicates whether video should be enabled in the conference. |
| `children`      | React.ReactNode | -       | A children element.                                                         |

## Examples

### React

```javascript
return (
  <Conference>
    <div>children element</div>
  </Conference>
);
```
