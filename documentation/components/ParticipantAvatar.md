# ParticipantAvatar

The ParticipantAvatar component is responsible for displaying remote participants' avatars.

## Props

| Name              | Type                 | Default | Description                                    |
| ----------------- | -------------------- | ------- | ---------------------------------------------- |
| `participant`     | Participant          | -       | The object of the selected participant.        |
| `...AvatarProps`? | Partial(AvatarProps) | -       | Props that will be passed to the root element. |

## Examples

### React

```javascript
return <ParticipantAvatar participant={participant} />;
```
