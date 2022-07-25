# useMicrophone

The useMicrophone hook gathers functions responsible for managing microphones.

## Members

| Name                        | Type                                   | Description                                     |
| --------------------------- | -------------------------------------- | ----------------------------------------------- |
| `getMicrophones`            | () => Promise<Mic[]>                   | Gets a list of the available microphones.       |
| `selectMicrophone`          | (Mic) => void)                         | Selects a microphone.                           |
| `getDefaultLocalMicrophone` | () => Promise<MediaDeviceInfo \| null> | Gets data of default microphone.                |
| `getMicrophonePermission`   | () => Promise<boolean>)                | Check status of browser microphone permissions. |

## Examples

### React

### Select source microphone

```javascript
const { getMicrophones, selectMicrophone } = useMicrophone();
const microphones = getMicrophones();
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
