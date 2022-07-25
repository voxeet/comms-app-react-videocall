# VideoLocalView

The VideoLocalView component is responsible for displaying video from the local user.

## Props

| Name                 | Type                    | Default | Description                                                                                                                                          |
| -------------------- | ----------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `width` ?            | number                  | 712     | The width of the local participant's video tile.                                                                                                     |
| `height` ?           | number                  | 400     | The height of the local participant's video tile.                                                                                                    |
| `noVideoFallback` ?  | () => ReactNode         | -       | The function that overwrites the default way of displaying videos.                                                                                   |
| `username` ?         | string                  | -       | The user name that can be displayed in the participant's avatar.                                                                                     |
| `device` ?           | string / null           | -       | The ID of the local participant's camera.                                                                                                            |
| `indicator` ?        | boolean                 | true    | A boolean that indicates whether the component displays the IconIndicator component in top right corner. If set to true, IconIndicator is displayed. |
| `audio` ?            | boolean                 | true    | A boolean responsible for enabling the local participant's microphone. If set to true, the component plays audio from the microphone.                |
| `testID` ?           | string                  | -       | The unique E2E test handler.                                                                                                                         |
| `...HTMLDivElement`? | Partial(HTMLDivElement) | -       | Props that will be passed to the root of the div element.                                                                                            |

## Examples

### React

```javascript
return <VideoLocalView width={200} height={300} />;
```
