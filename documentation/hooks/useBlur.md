# useBlur

The useBlur hook gathers functions responsible for toggling video background blur. Built-in function `startBackgroundBlur` attaches video processor to local video. To ensure the proper work of the video processor, the `vsl_impl.wasm` and `vsl_impl.pkgwvsl` files need to be accessible for download at URL that can be configured using the packageUrlPrefix accessor or by `packageUrlPrefix` prop in [CommsProvider](../providers/CommsProvider.md). Those files can be found in `@voxeet/voxeet-web-sdk` node module package. For additional information please visit [Dolby.io](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-localvideo#setprocessor).

## Members

| Name                  | Type       | Description                                        |
| --------------------- | ---------- | -------------------------------------------------- |
| `isBlurred`           | boolean    | Informs if local users video is currently blurred. |
| `startBackgroundBlur` | () => void | Starts video processing with blur.                 |
| `stopVideoProcessing` | () => void | Removes video processor.                           |
| `isSupported`         | boolean    | Informs if blur is suppoorted by environment.      |

## Examples

### React

### Start background blur.

```javascript
const { startBackgroundBlur } = useBlur();
...
<button onClick={startBackgroundBlur}>...</button>
```

### Stop video processor.

```javascript
const {stopVideoProcessing} = useBlur()

<button onClick={stopVideoProcessing}>...</button>
```
