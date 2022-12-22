# MusicModeButton

The MusicModeButton component is responsible for toggling music mode during videocall.

## Props

| Name                       | Type                                                               | Default       | Description                                                         |
| -------------------------- | ------------------------------------------------------------------ | ------------- | ------------------------------------------------------------------- |
| `onStopMusicModeAction`?   | ()=> void                                                          | -             | Callback invoked after music mode is stopped.                       |
| `onStartMusicModeAction`?  | ()=> void                                                          | -             | Callback invoked after music mode is started.                       |
| `renderStartConfirmation`? | (isVisible:boolean, accept:()=>void, cancel:()=>void )=> ReactNode | -             | Render component to confirm start music mode.                       |
| `renderStopConfirmation`?  | (isVisible:boolean, accept:()=>void, cancel:()=>void )=> ReactNode | -             | Render component to confirm stop music mode.                        |
| `defaultIcon`?             | IconsKeys                                                          | "tune"        | The icon of the default state of the button.                        |
| `activeIcon`?              | IconsKeys                                                          | "tune"        | The icon of the active state of the button.                         |
| `disabledIcon`?            | IconsKeys                                                          | "tune"        | The icon of the disabled state of the button.                       |
| `badge`?                   | boolean                                                            | true          | The small circular indicator that appears at the top of the button. |
| `badgeColor` ?             | ColorKey                                                           | "primary.500" | The color of the badge.                                             |
| `transparent`?             | boolean                                                            | true          | Boolean which informs if background is transparent.                 |
| `...MediaButtonProps`?     | Partial(MediaButtonProps)                                          | -             | Props that will be passed to the root of the button element.        |

## Examples

### React

```javascript
return <MusicModeButton size="s" defaultTooltipText="Music mode" />;
```
