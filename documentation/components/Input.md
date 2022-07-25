# Input

The Input component is responsible for interactive controls for forms in order to accept data from the user.

## Props

| Name                   | Type                                 | Default | Description                                                                                                                                            |
| ---------------------- | ------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `value`                | string                               | -       | The value of the input element that is required for a controlled component.                                                                            |
| `label` ?              | string                               | -       | The text displayed above the input element.                                                                                                            |
| `borderColor` ?        | ColorKey                             | -       | The color of the border.                                                                                                                               |
| `invalidBorderColor` ? | ColorKey                             | -       | The color of the input element that contains an invalid value.                                                                                         |
| `labelColor` ?         | ColorKey                             | -       | The color of text that is displayed in the label.                                                                                                      |
| `labelBackground` ?    | ColorKey                             | -       | The background color of the label.                                                                                                                     |
| `textColor` ?          | ColorKey                             | -       | The color of the input element.                                                                                                                        |
| `validation` ?         | { valid: boolean; message?: string } | -       | The validation of the provided value.                                                                                                                  |
| `onChange`             | function                             | -       | The event handler property for processing change events on the input element. You can pull out the new value by accessing event.target.value (string). |
| `testID` ?             | string                               | -       | The unique E2E test handler.                                                                                                                           |
| `...HTMLInputElement`? | Partial(HTMLInputElement)            | -       | Props that will be passed to the input element.                                                                                                        |

## Examples

### React

```javascript
return <Input label="Your Name" value={name} onChange={(event) => setName(event.target.value)} />;
```
