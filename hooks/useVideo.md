# useVideo

The useVideo hook gathers functions responsible for managing state of video transmission.

```javascript
import { useVideo } from '@dolbyio/comms-uikit-react';
```

## Members

| Name          | Type       | Description                          |
| ------------- | ---------- | ------------------------------------ |
| `isVideo`     | boolean    | Indicates video state of local user. |
| `toggleVideo` | () => void | Toggles video of local user.         |

## Examples

### React

### Enable / disable video

```javascript
const { toggleVideo } = useVideo();
...
<button onClick={toggleVideo}>...</button>
```

### Use current state of video

```javascript
import { useVideo, IconButton } from '@dolbyio/comms-uikit-react';
const { isVideo } = useVideo();

<IconButton icon={isVideo ? 'camera' : 'cameraOff'} />;
```
