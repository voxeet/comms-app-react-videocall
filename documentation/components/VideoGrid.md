# VideoGrid

The VideoGrid component is responsible for displaying video streams of participants in a grid layout.

## Props

| Name                 | Type                                       | Default | Description                                                    |
| -------------------- | ------------------------------------------ | ------- | -------------------------------------------------------------- |
| `participants` ?     | Participant[]                              | -       | The array of the participants objects.                         |
| `gap` ?              | number                                     | 8       | The space between tiles.                                       |
| `maxColumns` ?       | number                                     | 4       | The maximum number of columns.                                 |
| `maxTiles` ?         | number                                     | 24      | The maximum number of tiles.                                   |
| `minWidth` ?         | number                                     | 300     | The minimal width of the tile                                  |
| `renderItem`         | (participant: Participant) => ReactNode    | -       | The function that overwrites the default grid tile layout.     |
| `renderMaxTile`      | (participants: Participant[]) => ReactNode | -       | The function that overwrites the default grid max tile layout. |
| `testID` ?           | string                                     | -       | The unique E2E test handler.                                   |
| `...HTMLDivElement`? | Partial(HTMLDivElement)                    | -       | Props that will be passed to the root of the div element.      |

## Examples

### React

```javascript
return (
  <VideoGrid participants={...} gap={20} />
);
```
