# LocalName

The LocalName component is responsible for displaying the name of the local participant. This component can also display text passed by props in the ParticipantGrid component.

## Props

| Name            | Type               | Default | Description                                           |
| --------------- | ------------------ | ------- | ----------------------------------------------------- |
| `...PillProps`? | Partial(PillProps) | -       | Props that will be passed to the root of the element. |

## Examples

### React

```javascript
return <LocalName text="You" />;
```
