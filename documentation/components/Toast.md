# Toast

The Toast component is responsible for notifications.

## Props

| Name                 | Type                    | Default         | Description                                                                                                     |
| -------------------- | ----------------------- | --------------- | --------------------------------------------------------------------------------------------------------------- |
| `backgroundColor` ?  | ColorKey                | 'greyAlpha.800' | The background color of the toast element.                                                                      |
| `isVisible` ?        | boolean                 | -               | A boolean that indicates whether the toast element should be displayed. If set to true, the element is visible. |
| `children`           | React.ReactNode         | -               | The content of the toast element.                                                                               |
| `testID` ?           | string                  | -               | The unique E2E test handler.                                                                                    |
| `...HTMLDivElement`? | Partial(HTMLDivElement) | -               | Props that will be passed to the root of the div element.                                                       |

## Examples

### React

```javascript
return (
  <Toast isVisible={true}>
    <span>Well done!</span>
  </Toast>
);
```
