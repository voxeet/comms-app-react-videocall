# useConference

The useConference hook gathers functions responsible for managing conferences.

```javascript
import { useConference } from '@dolbyio/comms-uikit-react';
```

## Members

| Name                 | Type                                                                                                                                                                                                                                                                    | Description                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `conference`         | [Conference](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-conference)                                                                                                                                                                             | The object of the current conference.                     |
| `createConference`   | ([ConferenceOption](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-conferenceoptions)) => Promise<[Conference](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-conference)>                                                      | Creates a conference.                                     |
| `fetchConference`    | (id) => Promise<[Conference](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-conference)>                                                                                                                                                            | Fetches a conference.                                     |
| `joinConference`     | ([Conference](https://docs.dolby.io/communications-apis/docs/), [JoinOptions](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-joinoptions)) => Promise\<[Conference](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-conference)> | Joins a conference.                                       |
| `leaveConference`    | () => Promise\<void\>                                                                                                                                                                                                                                                   | Leaves a conference.                                      |
| `maxVideoForwarding` | number                                                                                                                                                                                                                                                                  | Retrieves maximum video forwarding for current user       |
| `setVideoForwarding` | (maxVideoForwarding: number, options?: Partial<VideoForwardingOptions>) => Promise\<void\>                                                                                                                                                                              | Sets videoForwarding for limiting incomming video streams |

## Examples

### React

### Get conference data

```javascript
const { conference } = useConference();

<span>{conference.alias}</span>;
```

> Read more on `Conference` model [here](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-conference).

### Create and join conference

```javascript
const { createConference, joinConference } = useConference();

const conferenceOptions = {
  alias: 'My Conference',
  params: {
    dolbyVoice: true,
  },
};
const newConference = await createConference(conferenceOptions);

const joinOptions = {
  constraints: {
    audio: true,
    video: false,
  },
};

await joinConference(newConference, joinOptions);
```

> Read more on `JoinOptions` model [here](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-joinoptions).

### Leave conference

```javascript
const { leaveConference } = useConference();

<button onClick={leaveConference}>...</button>;
```

### Set videoForwarding conference

```javascript
const { setVideoForwarding } = useConference();

<button onClick={() => setVideoForwarding({ maxVideoForwarding: 2, options: { strategy: 'lastSpeakerStrategy' } })}>
  ...
</button>;
```

> Read more on `VideoFowardingStrategy` model [here](https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-videoforwardingstrategy).
