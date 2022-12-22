# useConference

The useConference hook gathers functions responsible for managing conferences.

## Members

| Name                 | Type                                                                                     | Description                                               |
|----------------------|------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| `conference`         | Conference                                                                               | The object of the current conference.                     |
| `createConference`   | (ConferenceOptions) => Promise<Conference>                                               | Creates a conference.                                     |
| `fetchConference`    | (id) => Promise<Conference>                                                              | Fetches a conference.                                     |
| `joinConference`     | (Conference, JoinOptions) => Promise<Conference>                                         | Joins a conference.                                       |
| `leaveConference`    | () => Promise<void>                                                                      | Leaves a conference.                                      |
| `maxVideoForwarding` | number                                                                                   | Retrieves maximum video forwarding for current user       |
| `setVideoForwarding` | (maxVideoForwarding: number, options?: Partial<VideoForwardingOptions>) => Promise<void> | Sets videoForwarding for limiting incomming video streams |

## Examples

### React

### Get conference data

```javascript
const { conference } = useConference();

<span>{conference.alias}</span>;
```

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

### Leave conference

```javascript
const { leaveConference } = useConference();

<button onClick={leaveConference}>...</button>;
```

### Set videoForwarding conference

```javascript
const { setVideoForwarding } = useConference();

<button
  onClick={() =>
    setVideoForwarding({ maxVideoForwarding: 2, options: { strategy: VideoForwardingStrategy.LastSpeaker } })
  }
>
  ...
</button>;
```
