# useMessage

The useMessage hook gathers functions responsible for managing messages.

## Members

| Name           | Type                      | Description                                       |
| -------------- | ------------------------- | ------------------------------------------------- |
| `sender`       | Participant               | Object of the participant which send the message. |
| `message`      | string                    | Message which was received.                       |
| `sendMessage`  | (message: string) => void | Sends the message to all participants.            |
| `clearMessage` | () => void                | Clears received message data.                     |

## Examples

### React

### Send message

```javascript
const { sendMessage } = useMessage();

await sendMessage('Hello World');
```

### Display received message

```javascript
const { message } = useMessage();

<p>{message}</p>;
```

### Display name of the participant which send the message

```javascript
const { sender } = useMessage();

<p>{`Message sent by: ${sender.info.name}`}</p>;
```
