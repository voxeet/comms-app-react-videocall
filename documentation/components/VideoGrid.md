# VideoGrid

The VideoGrid component is responsible for displaying video streams of participants in a grid layout. Supports mobile devices by default. On small mobile devices, there are six fixed video tiles with a built-in mechanism to show currently speaking participants if there are more than six participants in a meeting. On bigger mobile devices there are eight fixed videos with same mechanism. Tablet behavior is predefined for up to twelve participants and above it, video tiles will have 25% width and 20% height.

## Props

| Name                 | Type                                       | Default | Description                                                    |
| -------------------- | ------------------------------------------ | ------- | -------------------------------------------------------------- |
| `participants` ?     | Participant[]                              | -       | The array of the participants objects.                         |
| `gap` ?              | number                                     | 8       | The space between tiles.                                       |
| `maxColumns` ?       | number                                     | 6       | The maximum number of columns.                                 |
| `maxTiles` ?         | number                                     | 24      | The maximum number of tiles.                                   |
| `minWidth` ?         | number                                     | 220     | The minimal width of the tile                                  |
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
