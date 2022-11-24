# RecordButton

The RecordButton component is responsible for toggling viceocall recording.

## Props

| Name                       | Type                                                               | Default  | Description                                                  |
| -------------------------- | ------------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| `size`?                    | "s" , "m"                                                          | "m"      | The size of the button.                                      |
| `onStopRecordingAction`?   | ()=> void                                                          | -        | Callback invoked after recording is stopped.                 |
| `onStartRecordingAction`?  | ()=> void                                                          | -        | Callback invoked after recording is started.                 |
| `onError`?                 | ()=> void                                                          | -        | Callback invoked if some error exists in recording.          |
| `renderStartConfirmation`? | (isVisible:boolean, accept:()=>void, cancel:()=>void )=> ReactNode | -        | Render component to confirm start recording.                 |
| `renderStopConfirmation`?  | (isVisible:boolean, accept:()=>void, cancel:()=>void )=> ReactNode | -        | Render component to confirm stop recording.                  |
| `tooltipPosition`?         | "top" , "bottom"                                                   | "top"    | The position of the tooltip.                                 |
| `defaultIcon`?             | IconsKeys                                                          | "record" | The icon of the default state of the button.                 |
| `activeIcon`?              | IconsKeys                                                          | "record" | The icon of the active state of the button.                  |
| `disabledIcon`?            | IconsKeys                                                          | "record" | The icon of the disabled state of the button.                |
| `...MediaButtonProps`?     | Partial(MediaButtonProps)                                          | -        | Props that will be passed to the root of the button element. |

## Examples

### React

```javascript
return <RecordButton size="s" defaultTooltipText="Stop recording" />;
```
