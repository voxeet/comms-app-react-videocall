# ParticipantToggleVideoButton

The ParticipantToggleVideoButton component is responsible for displaying remote participants' video streams to the local participant. The component adds buttons next to participant's names on the participants list.

## Props

| Name                   | Type                      | Default     | Description                                                                                                          |
| ---------------------- | ------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| `participant`          | Participant               | -           | The object of the selected participant.                                                                              |
| `size`?                | "s" , "m"                 | "m"         | The size of the button.                                                                                              |
| `tooltipPosition`?     | "top" , "bottom"          | "top"       | The position of the tooltip.                                                                                         |
| `activeIcon`?          | IconsKeys                 | "camera"    | The icon displayed on the button when a participant video is displayed.                                              |
| `inactiveIcon`?        | IconsKeys                 | "cameraOff" | The icon displayed on the button when a participant's video is disabled and not displayed for the local participant. |
| `disabledIcon`?        | IconsKeys                 | "cameraOff" | The icon displayed on the button when the button is disabled.                                                        |
| `...MediaButtonProps`? | Partial(MediaButtonProps) | -           | Props that will be passed to the root of the button element.                                                         |

## Examples

### React

```javascript
return <ParticipantToggleVideoButton participant={participant} activeTooltipText="Camera off" />;
```
