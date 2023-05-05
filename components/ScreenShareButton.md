# ScreenShareButton

The ScreenShareButton component is responsible for toggling screen sharing.

## Props

| Name                          | Type                                                               | Default   | Description                                                                          |
| ----------------------------- | ------------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------ |
| `size`?                       | "s" , "m"                                                          | "m"       | The size of the button.                                                              |
| `onStopSharingAction`?        | ()=> void                                                          | -         | Callback invoked after sharing is stopped.                                           |
| `onStartSharingAction`?       | ()=> void                                                          | -         | Callback invoked after sharing is started.                                           |
| `onTakeOverDeclineAction`?    | ()=> void                                                          | -         | Callback invoked after requesto for takeover is declined.                            |
| `onLackOfBrowserPermissions`? | ()=> void                                                          | -         | Callback invoked on lack of browser permissions to share screen.                     |
| `renderTakeOver`?             | (isVisible:boolean, resetError:()=>void)=> ReactNode               | -         | Render prop to display component while trying to share during actual screen sharing. |
| `renderHandOver`?             | (isVisible:boolean, acceptTakeover:()=>void)=> ReactNode           | -         | Render prop to display component while someone is trying to take over sharing.       |
| `renderAskForShare`?          | (isVisible:boolean, accept:()=>void, cancel:()=>void )=> ReactNode | -         | Render prop to display component when browser permissions error exists               |
| `tooltipPosition`?            | "top" , "bottom"                                                   | "top"     | The position of the tooltip.                                                         |
| `defaultIcon`?                | IconsKeys                                                          | "present" | The icon of the default state of the button.                                         |
| `activeIcon`?                 | IconsKeys                                                          | "present" | The icon of the active state of the button.                                          |
| `disabledIcon`?               | IconsKeys                                                          | "present" | The icon of the disabled state of the button.                                        |
| `...MediaButtonProps`?        | Partial(MediaButtonProps)                                          | -         | Props that will be passed to the root of the button element.                         |

## Examples

### React

```javascript
return <ScreenShareButton size="s" defaultTooltipText="Stop present" />;
```
