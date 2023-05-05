# useAudioProcessing

The useAudioProcessing hook gathers functions responsible for audio processing such an echo cancellation and noise reduction level and audio capture mode.
Hook expose audio capture mode setter as well. Audio capture mode is responsible for specific signal processing ex.

```javascript
import { useAudioProcessing } from '@dolbyio/comms-uikit-react';
```

To enable specific audio modes, this hook requires support from the following files located in `@voxeet/voxeet-web-sdk` node module package:

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

[Music mode](https://docs.dolby.io/communications-apis/docs/guides-music-mode) is currently supported only by Chrome and Edge browsers.

## Members

| Name                      | Type                                                                                                                                              | Description                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `audioMode`?              | [AudioCaptureModeOptions](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-audioprocessingoptions)                              | Currently selected audio mode with options.                            |
| `getAudioCaptureMode`     | () => Promise<[AudioCaptureModeOptions](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-audioprocessingoptions) \| void>       | Get current audio mode option or returns warning if audio is disabled. |
| `setAudioCaptureMode`?    | (option: [AudioCaptureModeOptions](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-audioprocessingoptions)) => Promise\<void\> | Setter for specific audio mode.                                        |
| `echoCancellation`?       | boolean                                                                                                                                           | Informs about current echo canellation state.                          |
| `isMusicMode`?            | boolean                                                                                                                                           | Informs if music mode is enabled / disabled.                           |
| `toggleEchoCancellation`? | () => Promise\<void\>                                                                                                                             | Toggles echo cancellation.                                             |
| `setNoiseReductionLevel`? | (value: [NoiseReductionLevel](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-noisereductionlevel)) => Promise\<void\>         | Setter for noise reduction level.                                      |
| `isMusiModeSupported`     | boolean                                                                                                                                           | Informs if music mode is supported by environment.                     |

## Examples

### React

### Start music mode.

```javascript
import { useAudioProcessing } from '@dolbyio/comms-uikit-react';
const { setAudioCaptureMode } = useAudioProcessing();
...
<button onClick={()=>setAudioCaptureMode({mode: "music"})}>...</button>
```

> Values for `mode` include `"unprocessed"`, `"standard"` or `"music"`

### Toggle echo cancellation .

```javascript
const {toggleEchoCancellation} = useAudioProcessing()

<button onClick={toggleEchoCancellation}>...</button>
```
