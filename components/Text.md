# Text

The Text component is responsible for displaying text.

## Props

| Name                  | Type                        | Default       | Description                                                                                       |
| --------------------- | --------------------------- | ------------- | ------------------------------------------------------------------------------------------------- |
| `children`            | React.ReactNode             | -             | The content of the component.                                                                     |
| `type` ?              | TextType                    | 'bodyDefault' | The type of style that allows you to distinguish between texts of different importance in the UI. |
| `color` ?             | ColorKey                    | -             | The color of the text.                                                                            |
| `font` ?              | string                      | -             | The preferred font.                                                                               |
| `uppercase` ?         | boolean                     | false         | A boolean that indicates whether the text should be converted to uppercase.                       |
| `align` ?             | 'left' / 'center' / 'right' | 'left'        | The preferred text alignment.                                                                     |
| `style` ?             | React.CSSProperties         | -             | The additional styles.                                                                            |
| `testID`?             | string                      | -             | The unique E2E test handler.                                                                      |
| `...HTMLSpanElement`? | Partial(HTMLSpanElement)    | -             | Props that will be passed to the root of the span element.                                        |

## Examples

### React

```javascript
return <Text type="H2">Hello</Text>;
```
