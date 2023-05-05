# useBlur

The useBlur hook gathers functions responsible for toggling video background blur. Built-in function `startBackgroundBlur` attaches video processor to local video.

```javascript
import { useBlur } from '@dolbyio/comms-uikit-react';
```

To enable video processing, this hook requires support from the following files located in `@voxeet/voxeet-web-sdk` node module package:

- `dvwc_impl.wasm`
- `voxeet-dvwc-worker.js`
- `voxeet-worklet.js`

You can configure the path to these files by setting the `packageUrlPrefix` accessor or the `packageUrlPrefix` prop in [CommsProvider](../providers/CommsProvider.md)

See example below to configure CommsProvider component to access the relevant files via voxeet-web-sdk CDN link:

```javascript
<CommsProvider
  token={token}
  refreshToken={refreshToken}
  packageUrlPrefix="https://cdn.jsdelivr.net/npm/@voxeet/voxeet-web-sdk/dist"
>
  {children}
</CommsProvider>
```

## Members

| Name                  | Type       | Description                                        |
| --------------------- | ---------- | -------------------------------------------------- |
| `isBlurred`           | boolean    | Informs if local users video is currently blurred. |
| `startBackgroundBlur` | () => void | Starts video processing with blur.                 |
| `stopVideoProcessing` | () => void | Removes video processor.                           |
| `isSupported`         | boolean    | Informs if blur is suppoorted by environment.      |

## Examples

### React

### Start / Stop background blur.

```javascript
const ToggleBlurButton = () => {
  const { startBackgroundBlur, stopVideoProcessing, isBlurred } = useBlur();

  const ToggleBlur = () => {
    if (isBlurred) {
      stopVideoProcessing();
    } else {
      startBackgroundBlur();
    }
  };
  return <button onClick={ToggleBlur}>{isBlurred ? 'Stop Blur' : 'Start Blur'}</button>;
};
```
