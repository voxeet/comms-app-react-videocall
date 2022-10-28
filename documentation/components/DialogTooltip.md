# DialogTooltip

The DialogTooltip component is a wrapper for displaying relative tooltip with content as a children.

### Props

| Name                 | Type                    | Default         | Description                                                   |
|----------------------|-------------------------|-----------------|---------------------------------------------------------------|
| `isVisible` ?        | boolean                 | -               | Flag for rendering component.                                 |
| `children` ?         | ReactNode               | -               | The React nodes to be rendered as children - tooltip content. |
| `position` ?         | `top` / `bottom`        | `top`           | Position for tooltip , under parent or above parent           |
| `backgroundColor` ?  | ColorKey                | `grey.800`      | Background color of tooltip                                   |
| `testID` ?           | string                  | `DialogTooltip` | Background color of tooltip                                   |
| `...HTMLDivElement`? | Partial(HTMLDivElement) | -               | Props that will be passed to the root of the div element.     |

```javascript
return <ScreenShareButton renderHandOver={(isVisible) => <DialogTooltip isVisible={true} />} />;
```
