# LiveStreamButton

The LiveStreamButton component is responsible for toggling live streaming.

## Props

| Name                          | Type                                                               | Default     | Description                                                                                    |
| ----------------------------- | ------------------------------------------------------------------ | ----------- | ---------------------------------------------------------------------------------------------- |
| `onStopLiveStreamingAction`?  | ()=> void                                                          | -           | Callback invoked after live streaming is stopped.                                              |
| `onStartLiveStreamingAction`? | ()=> void                                                          | -           | Callback invoked after live streaming is started.                                              |
| `onError`?                    | ()=> void                                                          | -           | Callback invoked if some error exists in live streaming.                                       |
| `stopStreaming`               | ()=> void                                                          | -           | Method from API which stops live streaming.                                                    |
| `renderDataInput`             | (isVisible:boolean,close:()=>void )=> ReactNode                    | -           | Render component with live streaming inputs.                                                   |
| `renderStopConfirmation`?     | (isVisible:boolean, accept:()=>void, cancel:()=>void )=> ReactNode | -           | Render component to confirm stop live streaming.                                               |
| `badge`?                      | boolean                                                            | true        | The small circular indicator that appears at the top of the button. Available only on desktop. |
| `badgeColor` ?                | ColorKey                                                           | "infoError" | The color of the badge.                                                                        |
| `transparent`?                | boolean                                                            | true        | Boolean which informs if background is transparent.                                            |
| `...MediaButtonProps`?        | Partial(MediaButtonProps)                                          | -           | Props that will be passed to the root of the button element.                                   |

## Examples

### React

```javascript
const { streamHandler } = useLiveStreaming();

const RenderProp = ({ flag, callback }: { flag: boolean, callback: () => void }) => {
  return flag ? (
    <div data-testid={testPropID}>
      <button type="button" onClick={callback}>
        CLICK
      </button>
    </div>
  ) : null;
};

return (
  <LiveStreamButton
    stopStreaming={() => {
      streamHandler('stop');
    }}
    renderDataInput={(flag, callback) => <RenderProp flag={flag} callback={callback} />}
  />
);
```
