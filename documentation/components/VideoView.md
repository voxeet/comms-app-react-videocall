# VideoView

The VideoView component is responsible for displaying video stream of each conference participant.

## Props

| Name                 | Type                    | Default | Description                                                         |
| -------------------- | ----------------------- | ------- | ------------------------------------------------------------------- |
| `participant`        | Participant             | -       | The participant object.                                             |
| `width` ?            | number                  | -       | The width of each video tile.                                       |
| `height` ?           | number                  | -       | The height of each video tile.                                      |
| `noVideoFallback` ?  | () => ReactNode         | -       | The function that overwrites the default way of displaying streams. |
| `isMirrored` ?       | boolean                 | false   | If true, video view is mirrored.                                    |
| `testID` ?           | string                  | -       | The unique E2E test handler.                                        |
| `...HTMLDivElement`? | Partial(HTMLDivElement) | -       | Props that will be passed to the root of the div element.           |

## Examples

### React

```javascript
return (
  <VideoView participant={...} width={200} height={300} />
);
```
