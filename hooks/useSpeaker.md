# useSpeaker

The useSpeaker hook gathers functions responsible for managing speakers.

```javascript
import { useSpeaker } from '@dolbyio/comms-uikit-react';
```

## Members

| Name                     | Type                                 | Description                                                                                    |
| ------------------------ | ------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `speakers`               | MediaDeviceInfo[]                    | Holds the list of the available speakers. `getSpeakers` should be invoked to set this variable |
| `getSpeakers`            | () => void                           | Gets a list of the available speakers and saves it to `speakers` variable                      |
| `selectSpeaker`          | (string) => Promise\<string\>        | Selects a speaker.                                                                             |
| `getDefaultLocalSpeaker` | () => Promise<MediaDeviceInfo\|null> | Gets data of default speaker.                                                                  |
| `getSelectedSpeaker`     | () => MediaDeviceInfo \| undefined   | Gets currently selected speaker in the conference.                                             |

## Examples

### React

### Select main speaker

```javascript
const { speakers, getSpeakers, selectSpeaker } = useSpeaker();
const SpeakersList = () => {
  useEffect(() => {
    getSpeakers();
  }, []);

  return speakers.map((s) => (
    <div key={s.deviceID} onClick={() => selectSpeaker(s)}>
      {s.label}
    </div>
  ));
};
```
