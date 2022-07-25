# useSpeaker

The useSpeaker hook gathers functions responsible for managing speakers.

## Members

| Name                     | Type                                   | Description                              |
| ------------------------ | -------------------------------------- | ---------------------------------------- |
| `getSpeakers`            | () => Promise<MediaDeviceInfo[]>       | Gets the list of the available speakers. |
| `selectSpeaker`          | (string) => Promise<string>            | Selects a speaker.                       |
| `getDefaultLocalSpeaker` | () => Promise<MediaDeviceInfo \| null> | Gets data of default speaker.            |

## Examples

### React

### Select main speaker

```javascript
const { getSpeakers, selectSpeaker } = useSpeaker();
const speakers = getSpeakers();

return speakers.map((s) => <div onClick={() => selectSpeaker(s)}>...</div>);
```
