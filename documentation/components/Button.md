# Button

The Button component is responsible for square and rectangular buttons.

## Props

| Name                    | Type                                 | Default | Description                                                                                            |
| ----------------------- | ------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------ |
| `children`              | ReactElement                         | -       | The content of the button.                                                                             |
| `variant` ?             | 'primary' / 'secondary' / 'tertiary' | -       | The variant of style that allows you to distinguish between actions of different importance in the UI. |
| `onClick` ?             | Function                             | -       | The event handler property for processing click events on the button.                                  |
| `testID` ?              | string                               | -       | The unique E2E test handler.                                                                           |
| `...HTMLButtonElement`? | Partial(HTMLDivElement)              | -       | Props that will be passed to the root of the button element.                                           |

## Examples

### React

```javascript
return <Button variant="secondary">Text</Button>;
```
