# Pill

The Pill component is responsible for displaying labels that contain additional descriptions.

## Props

| Name                        | Type                    | Default | Description                                               |
| --------------------------- | ----------------------- | ------- | --------------------------------------------------------- |
| `text` ?                    | string                  | -       | The text to display.                                      |
| `active` ?                  | bool                    | false   | The activity state.                                       |
| `size` ?                    | 's' , 'm'               | 'm'     | The size of the component.                                |
| `testID` ?                  | string                  | -       | The unique E2E test handler.                              |
| `...HTMLDivElement`?        | Partial(HTMLDivElement) | -       | Props that will be passed to the root of the div element. |

## Examples

### React

```javascript
return <Pill text="John Doe" active />;
```
