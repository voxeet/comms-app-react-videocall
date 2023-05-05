# useMicrophone

The useMicrophone hook gathers functions responsible for managing microphones.

```javascript
import { useMicrophone } from '@dolbyio/comms-uikit-react';
```

## Members

| Name                        | Type                                                                                                       | Description                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `microphones`               | [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo)[]                      | Holds the list of the available microphones. `getMicrophones` should be invoked to set this variable |
| `getMicrophones`            | () => void                                                                                                 | Gets a list of the available microphones and saves it to `microphones` variable                      |
| `selectMicrophone`          | (string) => void                                                                                           | Selects a microphone.                                                                                |
| `getDefaultLocalMicrophone` | () => Promise<[MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) \| null> | Gets data of default microphone.                                                                     |
| `getMicrophonePermission`   | () => Promise\<boolean\>                                                                                   | Checks status of browser microphone permissions.                                                     |
| `getSelectedMicrophone`     | () => [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) \| undefined     | Gets currently selected microphone in the conference.                                                |

## Examples

### React

### Select source microphone

```javascript
const MicrophonesList = () => {
  const { microphones, getMicrophones, selectMicrophone } = useMicrophone();
  useEffect(() => {
    getMicrophones();
  }, [getMicrophones]);

  return microphones.map((m) => (
    <div key={m.label} onClick={() => selectMicrophone(m)}>
      {m.label}
    </div>
  ));
};
```

### Check microphone permission

```javascript
const { getMicrophonePermission } = useMicrophone();
const [isMicrophonePermission, setIsMicrophonePermission] = useState(false);

useEffect(() => {
  (async () => {
    try {
      const hasAccess = await getMicrophonePermission();
      setIsMicrophonePermission(hasAccess);
    } catch {
      setIsMicrophonePermission(false);
    }
  })();
}, []);

<button disabled={!isMicrophonePermission}>...</button>;
```
