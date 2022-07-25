# SpeakersSelect

The SpeakersSelect component displays a list of available speaker devices that a user can select. The component offers a built-in method that allows changing the currently used device.

## Props

| Name              | Type     | Default | Description                                             |
| ----------------- | -------- | ------- | ------------------------------------------------------- |
| `labelColor`      | ColorKey | -       | The color of the label.                                 |
| `textColor`       | ColorKey | -       | The color of text.                                      |
| `backgroundColor` | ColorKey | -       | The background color of the select element.             |
| `placeholder`     | string   | -       | The default text to display when no option is selected. |
| `label`           | string   | -       | The text to display above the component.                |
| `testID` ?        | string   | -       | The unique E2E test handler.                            |

## Examples

### React

```javascript
return <SpeakersSelect testID="SpeakersSelect" label="Speakers" placeholder="Speakers" />;
```
