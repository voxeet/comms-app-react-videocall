# useMicrophone

The useMicrophone hook gathers functions responsible for managing microphones.

## Members

| Name                        | Type                                   | Description                                                                                          |
| --------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `microphones`               | MediaDeviceInfo[]                      | Holds the list of the available microphones. `getMicrophones` should be invoked to set this variable |
| `getMicrophones`            | () => void                             | Gets a list of the available microphones and saves it to `microphones` variable                      |
| `selectMicrophone`          | (string) => void                       | Selects a microphone.                                                                                |
| `getDefaultLocalMicrophone` | () => Promise<MediaDeviceInfo \| null> | Gets data of default microphone.                                                                     |
| `getMicrophonePermission`   | () => Promise<boolean>                 | Checks status of browser microphone permissions.                                                     |
| `getSelectedMicrophone`     | () => MediaDeviceInfo \| undefined     | Gets currently selected microphone in the conference.                                                |

## Examples

### React

### Select source microphone

```javascript
const { microphones, getMicrophones, selectMicrophone } = useMicrophone();

useEffect(() => {
  getMicrophones()
},[])

...
return (
    microphones.map((m) => (
    <div onClick={() => selectMicrophone(m)}>...</div>
    ))
)
```

### Enable / disable microphone

```javascript
const { toggleAudio } = useMicrophone();
...
<button onClick={toggleMicrophone}>...</button>
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
