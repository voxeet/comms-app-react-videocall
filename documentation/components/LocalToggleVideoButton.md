# LocalToggleVideoButton

The LocalToggleVideoButton component is responsible for enabling the local participant's camera.

## Props

| Name                   | Type                      | Default     | Description                                                  |
| ---------------------- | ------------------------- | ----------- | ------------------------------------------------------------ |
| `size`?                | "s" , "m"                 | "m"         | The size of the button.                                      |
| `tooltipPosition`?     | "top" , "bottom"          | "top"       | The position of the tooltip.                                 |
| `activeIcon`?          | IconsKeys                 | "camera"    | The Icon of an active state of the button.                   |
| `inactiveIcon`?        | IconsKeys                 | "cameraOff" | The Icon of an inactive state of the button.                 |
| `disabledIcon`?        | IconsKeys                 | "cameraOff" | The Icon of the disabled state of the button.                |
| `...MediaButtonProps`? | Partial(MediaButtonProps) | -           | Props that will be passed to the root of the button element. |

## Examples

### React

```javascript
return <LocalToggleVideoButton size="s" activeTooltipText="Camera off" />;
```
