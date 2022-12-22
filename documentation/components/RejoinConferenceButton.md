# RejoinConferenceButton

The RejoinConferenceButton component is responsible for a button that allows rejoining conferences. The component uses the join method from the SDK.

## Props

| Name          | Type                     | Default | Description                                                                                                                                                                             |
| ------------- | ------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`        | string                   | -       | The text inside the button.                                                                                                                                                             |
| `onStart`?    | (value: boolean) => void | -       | A function to trigger while rejoining. True trigger the function when rejoining starts, false stops the function when rejoining ends. The function can be useful for creating a loader. |
| `onSuccess`?  | () => void               | -       | A function to execute when rejoining succeeds.                                                                                                                                          |
| `joinOptions` | JoinOptions              | -       | An object representing the desired configuration of the conference.                                                                                                                     |
| `testID` ?    | string                   | -       | The unique E2E test handler.                                                                                                                                                            |

## Examples

### React

```javascript
const [isLoading, setIsLoading] = useState(false);

const joinOptions = {
  constraints: {
    audio: true,
    video: true,
  },
};

const onSuccess = () => {
  navigate('conference');
};

if (isLoading) {
  return <Loader />;
}

return (
  <RejoinConferenceButton
    onStart={setIsLoading}
    onSuccess={onSuccess}
    text="Rejoin"
    testID="RejoinButton"
    joinOptions={joinOptions}
  />
);
```
