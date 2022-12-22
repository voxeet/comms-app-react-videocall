# useAudioProcessing

The useAudioProcessing hook gathers functions responsible for audio processing such an echo cancellation and noise reduction level and audio capture mode.
Hook expose audio capture mode setter as well. Audio capture mode is responsible for specific signal processing ex.

There are several files needed for specific modes.
To ensure the proper work of the audio processor, the `dvwc_impl.wasm`, `voxeet-dvwc-worker.js` and `voxeet-worklet.js` files need to be accessible for download at URL that can be configured using the packageUrlPrefix accessor or by `packageUrlPrefix` prop in [CommsProvider](../providers/CommsProvider.md). Those files can be found in `@voxeet/voxeet-web-sdk` node module package.
For additional information please visit [Dolby.io](https://docs.dolby.io/communications-apis/docs/).
Music mode is currently supported only by Chrome and Edge browsers.

## Members

| Name                      | Type                                               | Description                                                            |
| ------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------- |
| `audioMode`?              | AudioCaptureModeOptions                            | Currently selected audio mode with options.                            |
| `getAudioCaptureMode`     | () => Promise<AudioCaptureModeOptions / void>      | Get current audio mode option or returns warning if audio is disabled. |
| `setAudioCaptureMode`?    | (option: AudioCaptureModeOptions) => Promise<void> | Setter for specific audio mode.                                        |
| `echoCancellation`?       | boolean                                            | Informs about current echo canellation state.                          |
| `isMusicMode`?            | boolean                                            | Informs if music mode is enabled / disabled.                           |
| `toggleEchoCancellation`? | () => Promise<void>                                | Toggles echo cancellation.                                             |
| `setNoiseReductionLevel`? | (value: NoiseReductionLevel) => Promise<void>      | Setter for noise reduction level.                                      |
| `isMusiModeSupported`     | boolean                                            | Informs if music mode is supported by environment.                     |

## Examples

### React

### Start music mode.

```javascript
const { setAudioCaptureMode } = useAudioProcessing();
...
<button onClick={()=>setAudioCaptureMode({mode:AudioCaptureMode.Music })}>...</button>
```

### Toggle echo cancellation .

```javascript
const {toggleEchoCancellation} = useAudioProcessing()

<button onClick={toggleEchoCancellation}>...</button>
```
