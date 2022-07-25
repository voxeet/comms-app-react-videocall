# Tooltip

The Tooltip component is responsible for displaying informative text when users hover over, focus on, or tap an element.

## Props

| Name                 | Type                    | Default | Description                                               |
| -------------------- | ----------------------- | ------- | --------------------------------------------------------- |
| `text`               | string                  | -       | The text to display.                                      |
| `position` ?         | 'top' / 'bottom'        | -       | The position of the tooltip element.                      |
| `backgroundColor`?   | ColorKey                | -       | The background color of the tooltip element.              |
| `textColor` ?        | ColorKey                | -       | The color of the text in the tooltip element.             |
| `children` ?         | ReactElement            | -       | The content od the tooltip element.                       |
| `testID` ?           | string                  | -       | The unique E2E test handler.                              |
| `...HTMLDivElement`? | Partial(HTMLDivElement) | -       | Props that will be passed to the root of the div element. |

## Examples

### React

```javascript
return (
  <Tooltip text="John Doe">
    <Button>Aaa</Button>
  </Tooltip>
);
```
