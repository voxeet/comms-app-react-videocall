# MediaButton

The MediaButton component is a base for building camera or audio buttons for local and remote participants. It ensures a similar look and behavior of buttons.

## Props

| Name                       | Type                            | Default       | Description                                                           |
| -------------------------- | ------------------------------- | ------------- | --------------------------------------------------------------------- |
| `activeBackgroundColor`?   | ColorKey , [ColorKey, ColorKey] | "grey.800"    | The background color of the button in the active state.               |
| `inactiveBackgroundColor`? | ColorKey , [ColorKey, ColorKey] | "white"       | The background color of the button in the inactive state.             |
| `disabledBackgroundColor`? | ColorKey , [ColorKey, ColorKey] | "grey.900"    | The background color of the button in the disabled state.             |
| `activeIconColor`?         | ColorKey                        | "white"       | The color of the icon in the active state.                            |
| `inactiveIconColor`?       | ColorKey                        | "primary.500" | The color of the icon in the inactive state.                          |
| `disabledIconColor`?       | ColorKey                        | "grey.300"    | The color of the icon in the disabled state.                          |
| `activeStrokeColor`?       | ColorKey                        | "transparent" | The stroke color in the active state.                                 |
| `inactiveStrokeColor`?     | ColorKey                        | "transparent" | The stroke color in the inactive state.                               |
| `disabledStrokeColor`?     | ColorKey                        | "transparent" | The stroke color in the disabled state.                               |
| `activeIcon`               | IconsKeys                       | -             | The name of the icon in the active state.                             |
| `inactiveIcon`             | IconsKeys                       | -             | The name of the icon in the inactive state.                           |
| `disabledIcon`             | IconsKeys                       | -             | The name of the icon in the disabled state.                           |
| `activeTooltipText`?       | string                          | ""            | The tooltip text in the active state.                                 |
| `inactiveTooltipText`?     | string                          | ""            | The tooltip text in the inactive state.                               |
| `tooltipPosition`?         | "top", "bottom                  | "top"         | The position of the tooltip.                                          |
| `isActive`                 | boolean                         | -             | Sets the active state of the button.                                  |
| `isDisabled`               | boolean                         | -             | Sets the disabled state of the button.                                |
| `size`?                    | "s", "m"                        | "m"           | The size of the button.                                               |
| `onClick`                  | () => void                      | -             | The event handler property for processing click events on the button. |
| `testID`?                  | string                          | -             | The unique E2E test handler.                                          |

## Examples

### React

```javascript
return (
  <MediaButton
    activeIcon={activeIcon}
    inactiveIcon={inactiveIcon}
    disabledIcon={disabledIcon}
    isActive={isAudio}
    isDisabled={!isMicrophonePermission || !participant}
    onClick={toggleAudio}
    testID={testID}
  />
);
```
