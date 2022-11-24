# useMessage

The useMessage hook gathers functions responsible for managing messages.

## Members

| Name           | Type                                        | Description                                       |
| -------------- | ------------------------------------------- | ------------------------------------------------- |
| `sender`       | Participant                                 | Object of the participant which send the message. |
| `message`      | Record<string, unknown>                     | Object of message which was received.             |
| `sendMessage`  | (message: Record<string, unknown> ) => void | Sends the message to all participants.            |
| `clearMessage` | () => void                                  | Clears received message data.                     |

## Examples

### React

### Send message

```javascript
const { sendMessage } = useMessage();

await sendMessage({
  text: 'Hello World',
});
```

### Display received message

```javascript
const { message } = useMessage();

const {text} = message

<p>{text}</p>;
```

### Display name of the participant which send the message

```javascript
const { sender } = useMessage();

<p>{`Message sent by: ${sender.info.name}`}</p>;
```
