# Overlay

The Overlay component is responsible to display overlay with children. Used for modals , drawers and loaders

## Props

| Name                 | Type           | Default   | Description                                               |
|----------------------|----------------|-----------|-----------------------------------------------------------|
| `opacity` ?          | number         | 0.8       | Opacity of overlay.                                       |
| `onClick` ?          | ()=> void      | -         | OnClick handler while clicking on overlay.                |
| `visible` ?          | boolean        | true      | Visibility flag for overlay and its children.             |
| `testID` ?           | string         | `Overlay` | The unique E2E test handler.                              |
| `color` ?            | ColorKey       | -         | Overlay color.                                            |
| `nested` ?           | boolean        | -         | Position overlay inside relative element.                 |
| `children` ?         | ReactNode      | -         | The React nodes to be rendered as children.               |
| `...HTMLDivElement`? | Partial(Space) | -         | Props that will be passed to the root of the div element. |

## Examples

### React

```javascript
return (
  <Overlay visible={isLoading}>
    <Spinner />
  </Overlay>
);
```
