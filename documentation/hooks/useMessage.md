# useMessage

The useMessage hook gathers functions responsible for managing messages.

```javascript
import { useMessage } from '@dolbyio/comms-uikit-react';
```

## Members

| Name           | Type                                                                                          | Description                                       |
| -------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `sender`       | [Participant](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-participant) | Object of the participant which send the message. |
| `message`      | Record<string, unknown>                                                                       | Object of message which was received.             |
| `sendMessage`  | (message: Record<string, unknown> ) => void                                                   | Sends the message to all participants.            |
| `clearMessage` | () => void                                                                                    | Clears received message data.                     |

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

const { text } = message;

<p>{text}</p>;
```

### Display name of the participant which send the message

```javascript
const { sender } = useMessage();

<p>{`Message sent by: ${sender.info.name}`}</p>;
```

### Simple Chat Component with the useMessage Hook Integration

```javascript
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { message, sender, sendMessage } = useMessage();

  useEffect(() => {
    if (!message) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        text: message.text,
        sender: sender.info.name,
      },
    ]);
  }, [message, sender]);

  return (
    <div>
      <div>
        {messages.map((m) => (
          <span>
            {m.sender}: {m.text}
          </span>
        ))}
      </div>
      <button onClick={() => sendMessage({ text: 'Hello!' })}>Say Hello</button>
    </div>
  );
};
```
