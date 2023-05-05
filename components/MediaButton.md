# MediaButton

The MediaButton component is a base for building camera or audio buttons for local and remote participants. It ensures a similar look and behavior of buttons.

## Props

| Name                       | Type                            | Default       | Description                                                           |
| -------------------------- | ------------------------------- | ------------- | --------------------------------------------------------------------- |
| `transparent`?             | boolean                         | false         | Boolean which informs if background is transparent.                   |
| `defaultBackgroundColor`?  | ColorKey , [ColorKey, ColorKey] | "grey.800"    | The background color of the button in the default state.              |
| `activeBackgroundColor`?   | ColorKey , [ColorKey, ColorKey] | "white"       | The background color of the button in the active state.               |
| `disabledBackgroundColor`? | ColorKey , [ColorKey, ColorKey] | "grey.900"    | The background color of the button in the disabled state.             |
| `defaultIconColor`?        | ColorKey                        | "white"       | The color of the icon in the default state.                           |
| `activeIconColor`?         | ColorKey                        | "primary.500" | The color of the icon in the active state.                            |
| `disabledIconColor`?       | ColorKey                        | "grey.300"    | The color of the icon in the disabled state.                          |
| `defaultStrokeColor`?      | ColorKey                        | "transparent" | The stroke color in the default state.                                |
| `activeStrokeColor`?       | ColorKey                        | "transparent" | The stroke color in the active state.                                 |
| `disabledStrokeColor`?     | ColorKey                        | "transparent" | The stroke color in the disabled state.                               |
| `defaultIcon`              | IconsKeys                       | -             | The name of the icon in the default state.                            |
| `activeIcon`               | IconsKeys                       | -             | The name of the icon in the active state.                             |
| `disabledIcon`             | IconsKeys                       | -             | The name of the icon in the disabled state.                           |
| `defaultTooltipText`?      | string                          | ""            | The tooltip text in the default state.                                |
| `activeTooltipText`?       | string                          | ""            | The tooltip text in the active state.                                 |
| `tooltipPosition`?         | "top", "bottom                  | "top"         | The position of the tooltip.                                          |
| `badge` ?                  | string / number / boolean       | false         | The small circular indicator that appears at the top of the button.   |
| `badgeColor` ?             | ColorKey                        | -             | The color of the badge.                                               |
| `isActive`                 | boolean                         | -             | Sets the active state of the button.                                  |
| `isDisabled`?              | boolean                         | -             | Sets the disabled state of the button.                                |
| `size`?                    | "s", "m", "l"                   | "m"           | The size of the button.                                               |
| `onClick`                  | () => void                      | -             | The event handler property for processing click events on the button. |
| `testID`?                  | string                          | -             | The unique E2E test handler.                                          |
| `style` ?                  | CSSProperties                   | -             | The style of the layout.                                              |

## Examples

### React

```javascript
return (
  <MediaButton
    defaultIcon={defaultIcon}
    activeIcon={activeIcon}
    disabledIcon={disabledIcon}
    isActive={!isAudio}
    isDisabled={!isMicrophonePermission || !participant}
    onClick={toggleAudio}
    testID={testID}
  />
);
```
