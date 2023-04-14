# Avatar

The Avatar component is a graphical representation of an object or an entity, for example, a person or an organization.

## Props

| Name                 | Type                    | Default | Description                                               |
| -------------------- | ----------------------- | ------- | --------------------------------------------------------- |
| `participant`        | Participant             | -       | The Participant object.                                   |
| `size`?              | 'xs' / 's' / 'm' / 'l'  | 'l'     | The size of the avatar.                                   |
| `borderColor`?       | ColorKey                | -       | The color of the avatar's border.                         |
| `testID`?            | string                  | -       | The unique E2E test handler.                              |
| `...HTMLDivElement`? | Partial(HTMLDivElement) | -       | Props that will be passed to the root of the div element. |

## Examples

### React

```javascript
return <Avatar participant={part} size={l} />;
```
