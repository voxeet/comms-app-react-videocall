# useErrors

The useErrors hook exposes errors and methods to remove handled ones. The errors are exposed via arrays. It is recommended that the application observe these errors and handle them appropriately.

```javascript
import { useErrors } from '@dolbyio/comms-uikit-react';
```

## Members

| Name                  | Type                            | Description                                                                     |
| --------------------- | ------------------------------- | ------------------------------------------------------------------------------- |
| `sdkErrors`           | ErrorsType['sdkErrors']         | Errors related to sdk (connection , sessions, tokens).                          |
| `screenShareErrors`   | ErrorsType['screenShareErrors'] | Errors related to screen sharing.                                               |
| `recordingErrors`     | ErrorsType['recordingErrors']   | Errors related to videocall recording.                                          |
| `removeSdkErrors`     | (error?: ErrorCodes) => void    | Remove specific error or clean sdk errors.                                      |
| `setErrorsExplicitly` | (params? ErrorParams) => void   | Sets specific error. Also can be used for exception purposes inside application |

## Examples

### React

### Remove specific error from sdk errors

```javascript
const { removeSdkErrors } = useErrors();

removeSdkErrors(ErrorCode.IncorrectSession);
```

### Simulate error/ set specific error

```javascript
import { useErrors, ErrorCodes } from '@dolbyio/comms-uikit-react';

const { setErrorsExplicitly } = useErrors();
setErrorsExplicitly({ error: ErrorCodes.IncorrectSession, context: 'sdkErrors' });
```
