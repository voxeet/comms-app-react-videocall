# DeviceInfo

The DeviceInfo component is responsible for displaying a toast element with additional information about a device for 4 seconds.

## Props

| Name         | Type      | Default | Description                  |
| ------------ | --------- | ------- | ---------------------------- |
| `icon`?      | IconsKeys | -       | The name of the icon.        |
| `iconColor`? | ColorKey  | white   | The color of the icon.       |
| `textColor`? | ColorKey  | white   | The color of text.           |
| `device`     | string    | -       | The displayed text.          |
| `testID` ?   | string    | -       | The unique E2E test handler. |

## Examples

### React

```javascript
return <DeviceInfo testID="MicrophoneInfo" icon="microphone" device="Built-in microphone" />;
```
