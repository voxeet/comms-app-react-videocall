# VideoGrid

The VideoGrid component is responsible for displaying video streams of participants in a grid layout. Supports mobile devices by default. The VideoGrid counts available space and tries to fit VideoTiles in it.

## Props

| Name                 | Type                                       | Default | Description                                                                                                  |
| -------------------- | ------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------ |
| `participants` ?     | Participant[]                              | -       | The array of the participants objects.                                                                       |
| `gap` ?              | number                                     | 8       | The space between tiles.                                                                                     |
| `maxTiles` ?         | number                                     | 24      | The maximum number of tiles. Value must be bigger than 2.                                                    |
| `renderItem`         | (participant: Participant) => ReactNode    | -       | The function that overwrites the default grid tile layout.                                                   |
| `renderMaxTile`      | (participants: Participant[]) => ReactNode | -       | The function that overwrites the default grid max tile layout.                                               |
| `presenterFirst`     | boolean                                    | true    | This value determines if the user who is currently presenting should be at the first spot on the video grid. |
| `testID` ?           | string                                     | -       | The unique E2E test handler.                                                                                 |
| `...HTMLDivElement`? | Partial(HTMLDivElement)                    | -       | Props that will be passed to the root of the div element.                                                    |

## Examples

### React

```javascript
return (
  <VideoGrid participants={...} gap={20} />
);
```
