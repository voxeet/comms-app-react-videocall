# useSession

The useSession hook gathers functions responsible for managing sessions.

```javascript
import { useSession } from '@dolbyio/comms-uikit-react';
```

## Members

| Name           | Type                                                                                                            | Description                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `openSession`  | ([`ParticipantInfo`](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-participantinfo)) => {} | Opens a new Dolby.io session.                     |
| `closeSession` | () => {}                                                                                                        | Closes the current Dolby.io session.              |
| `participant`  | [Participant](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-participant)                   | The object of the local participant in a session. |

## Examples

### React

### Open session

```javascript
const { openSession } = useSession();

const open = async () => {
  await openSession({
    name: `John Doe`,
  });
};

<button onClick={open}>...</button>;
```

Read more on `ParticipantInfo` model [here](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-participantinfo)

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

> Read more on `Participant` model [here](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-participant).
