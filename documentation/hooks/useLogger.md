# useLogger

The useErrors hook expose errors and methods to remove handled ones.

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
