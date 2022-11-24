# MicrophoneSelect

The MicrophoneSelect component displays a list of available microphone devices that a user can select. The component offers a built-in method that allows changing the currently used device.

## Props

| Name                    | Type     | Default    | Description                                             |
| ----------------------- | -------- | ---------- | ------------------------------------------------------- |
| `labelColor`?           | ColorKey | "grey.500" | The color of the label.                                 |
| `textColor`?            | ColorKey | "grey.500" | The color of text.                                      |
| `backgroundColor`?      | ColorKey | "white"    | The background color of the select element.             |
| `iconColor`?            | ColorKey | "grey.300" | The color of icons.                                     |
| `hoverColor`?           | ColorKey | "grey.50"  | The color of options on dropdown list.                  |
| `primaryBorderColor`?   | ColorKey | "grey.100" | The primary border color of main control element.       |
| `secondaryBorderColor`? | ColorKey | "grey.200" | The secondary border color of main control element.     |
| `placeholder`           | string   | -          | The default text to display when no option is selected. |
| `label`                 | string   | -          | The text to display above the component.                |
| `testID` ?              | string   | -          | The unique E2E test handler.                            |

## Examples

### React

```javascript
return <MicrophoneSelect testID="MicrophoneSelect" label="Microphone" placeholder="Microphone" />;
```
