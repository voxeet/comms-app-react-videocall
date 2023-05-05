# useCamera

The useCamera hook gathers functions responsible for managing cameras.

```javascript
import { useCamera } from '@dolbyio/comms-uikit-react';
```

## Members

| Name                    | Type                                 | Description                                                                                  |
| ----------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------- |
| `cameras`               | MediaDeviceInfo[]                    | Holds the list of the available cameras. `getCameras` should be invoked to set this variable |
| `getCameras`            | () => void                           | Gets a list of the available cameras and saves it to `cameras` variable                      |
| `selectCamera`          | (string) => Promise\<string\>        | Selects a camera.                                                                            |
| `getDefaultLocalCamera` | () => Promise<MediaDeviceInfo\|null> | Gets data of default camera.                                                                 |
| `getCameraPermission`   | () => Promise\<boolean\>             | Check status of browser camera permissions.                                                  |
| `swapCamera`            | ()=> Promise\<void\>                 | Change current camera between front and rear cameras. Useful on mobile browsers.             |
| `getSelectedCamera`     | () => MediaDeviceInfo \| undefined   | Gets currently selected camera in the conference.                                            |

## Examples

### React

### Select source camera

```javascript
const CamerasList = () => {
  const { cameras, getCameras, selectCamera } = useCamera();
  useEffect(() => {
    getCameras();
  }, [getCameras]);

  return cameras.map((c) => (
    <div key={c.label} onClick={() => selectCamera(c)}>
      {c.label}
    </div>
  ));
};
```

### Use default camera as source

```javascript
const { getDefaultLocalCamera } = useCamera();
const [localCamera, setLocalCamera] = useState(null);

useEffect(() => {
  if (localCamera === null) {
    (async () => {
      setLocalCamera(await getDefaultLocalCamera());
    })();
  }
}, [localCamera]);
```

### Check camera permission

```javascript
const { getCameraPermission } = useCamera();
const [isCameraPermission, setIsCameraPermission] = useState(false);

useEffect(() => {
  (async () => {
    try {
      const hasAccess = await getCameraPermission();
      setIsCameraPermission(hasAccess);
    } catch {
      setIsCameraPermission(false);
    }
  })();
}, []);

<button disabled={!isCameraPermission}>...</button>;
```
