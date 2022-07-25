# ParticipantToggleAudioButton

The ParticipantToggleAudioButton component allows the local participant to enable and disable remote participant's audio. The component adds mute buttons next to participant's names on the participants list.

## Props

| Name                   | Type                      | Default      | Description                                                       |
| ---------------------- | ------------------------- | ------------ | ----------------------------------------------------------------- |
| `participant`          | Participant               | -            | The object of the selected participant.                           |
| `size`?                | "s" , "m"                 | "m"          | The size of the button.                                           |
| `tooltipPosition`?     | "top" , "bottom"          | "top"        | The position of the tooltip.                                      |
| `activeIcon`?          | IconsKeys                 | "speaker"    | The icon displayed on the button when a participant is not muted. |
| `inactiveIcon`?        | IconsKeys                 | "speakerOff" | The icon displayed on the button when a participant is muted.     |
| `disabledIcon`?        | IconsKeys                 | "speakerOff" | The icon displayed on the button when the button is disabled.     |
| `...MediaButtonProps`? | Partial(MediaButtonProps) | -            | Props that will be passed to the root of the button element.      |

## Examples

### React

```javascript
return <ParticipantToggleAudioButton participant={participant} activeTooltipText="Volume off" />;
```
