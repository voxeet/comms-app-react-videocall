# IconIndicator

The IconIndicator component is responsible for displaying icons.

## Props

| Name                 | Type                    | Default | Description                                               |
| -------------------- | ----------------------- | ------- | --------------------------------------------------------- |
| `icon`               | IconsKeys               | -       | The name of the icon file.                                |
| `backgroundColor`?   | ColorKey                | -       | The background color of the indicator.                    |
| `iconColor` ?        | ColorKey                | -       | The color of the icon.                                    |
| `size` ?             | 's' / 'm'               | 'm'     | The size of the indicator.                                |
| `testID` ?           | string                  | -       | The unique E2E test handler.                              |
| `...HTMLDivElement`? | Partial(HTMLDivElement) | -       | Props that will be passed to the root of the div element. |

## Examples

### React

```javascript
return <IconIndicator icon="user" />;
```
