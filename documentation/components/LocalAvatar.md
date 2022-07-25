# LocalAvatar

The LocalAvatar component is responsible for displaying an avatar of the local participant.

## Props

| Name              | Type                 | Default | Description                                                                         |
| ----------------- | -------------------- | ------- | ----------------------------------------------------------------------------------- |
| `username`?       | string               | -       | The user name. This prop is supported even if the local participant does not exist. |
| `...AvatarProps`? | Partial(AvatarProps) | -       | Props that will be passed to the root of the element.                               |

## Examples

### React

```javascript
return <LocalAvatar username="John Doe" />;
```
