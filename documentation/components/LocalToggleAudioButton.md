# LocalToggleAudioButton

The LocalToggleAudioButton component is responsible for muting the local participant.

## Props

| Name                   | Type                      | Default         | Description                                                  |
| ---------------------- | ------------------------- | --------------- | ------------------------------------------------------------ |
| `size`?                | "s" , "m"                 | "m"             | The size of the button.                                      |
| `tooltipPosition`?     | "top" , "bottom"          | "top"           | The position of the tooltip.                                 |
| `defaultIcon`?         | IconsKeys                 | "microphone"    | The icon of the default state of the button.                 |
| `activeIcon`?          | IconsKeys                 | "microphoneOff" | The icon of the active state of the button.                  |
| `disabledIcon`?        | IconsKeys                 | "microphoneOff" | The icon of the disabled state of the button.                |
| `...MediaButtonProps`? | Partial(MediaButtonProps) | -               | Props that will be passed to the root of the button element. |

## Examples

### React

```javascript
return <LocalToggleAudioButton size="s" defaultTooltipText="Mute" />;
```
