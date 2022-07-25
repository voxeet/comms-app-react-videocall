# useSession

The useSession hook gathers functions responsible for managing sessions.

## Members

| Name           | Type     | Description                                       |
| -------------- | -------- | ------------------------------------------------- |
| `openSession`  | () => {} | Opens a new Dolby.io session.                     |
| `closeSession` | () => {} | Closes the current Dolby.io session.              |
| `participant`  | Participant     | The object of the local participant in a session. |

## Examples

### React

### Open session

```javascript
const { openSession } = useSession();

await openSession({
  name: `John Doe`,
});
```

### Close session

```javascript
const { closeSession } = useSession();

const close = async () => {
  await closeSession();
};

<button onClick={close}>...</button>;
```

### Get local participant data

```javascript
const { participant } = useSession();

<p>{participant.info.name}</p>;
```
