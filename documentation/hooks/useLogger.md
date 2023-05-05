# useLogger

The useLogger hook allows you to pump logs to the browser console to see things as they happen. By default, the level of logging is set to `LogLevel.info`, with the possible options being `LogLevel.info`, `LogLevel.warn` and `LogLevel.error`.

```javascript
import { useLogger } from '@dolbyio/comms-uikit-react';
```

## Members

| Name  | Type                                                                 | Description            |
| ----- | -------------------------------------------------------------------- | ---------------------- |
| `log` | (level: LogLevel, message: string, ...optionalParams: any[]) => void | Method for create log. |

## Examples

### React

### Remove specific error from sdk errors

```javascript
const { log } = useLogger();

log(LogLevel.warn, 'Some warning');
```
