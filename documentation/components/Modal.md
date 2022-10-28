# Modal

The Modal component is responsible to display modal with children with predefined shape and option to close it
by clicking either overlay or close button.

## Props

| Name                  | Type           | Default    | Description                                               |
|-----------------------|----------------|------------|-----------------------------------------------------------|
| `isVisible`           | boolean        | \_         | Determines if modal is displayed.                         |
| `close`               | () => void     | -          | Callback prop to close modal.                             |
| `backdropColor` ?     | ColorKey       | `black`    | Overlay color.                                            |
| `backgroundColor` ?   | string         | `grey.800` | Color key for main container.                             |
| `closeIconColor` ?    | ColorKey       | `white`    | Color key for close button icon.                          |
| `closeButtonColor` ?  | ColorKey       | `grey.500` | Color for close button background.                        |
| `testID` ?            | string         | `Overlay`  | The unique E2E test handler.                              |
| `modalWidth` ?        | number         | 375        | Width of main modal component.                            |
| `children` ?          | ReactNode      | -          | The React nodes to be rendered as children.               |
| `closeButton` ?       | boolean        | -          | Determines if modal displays default close icon.          |
| `overlayClickClose` ? | boolean        | -          | Determines if clicking on overlay should close modal.     |
| `children` ?          | ReactNode      | -          | The React nodes to be rendered as children.               |
| `...HTMLDivElement`?  | Partial(Space) | -          | Props that will be passed to the root of the div element. |

## Examples

### React

```javascript
return (
  <Modal isVisible={isOpen} close={() => {}}>
    <Spinner />
  </Modal>
);
```
