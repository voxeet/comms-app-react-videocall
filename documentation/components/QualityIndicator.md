# QualityIndicator

The QualityIndicator component represents the quality of participants' audio and video streams.

## Props

| Name                 | Type                    | Default | Description                                                                                                                                                                                                    |
| -------------------- | ----------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `qualityLevel`       | -1 , 1 , 2 , 3 , 4 , 5  | -       | The quality level. The values are in a range from 1 to 5, where 1 represents the worst quality and 5 represents the highest quality. In cases when the level is not available, this prop returns the value -1. |
| `backgroundColor`?   | ColorKey                | -       | The background color of the indicator.                                                                                                                                                                         |
| `activeColor` ?      | ColorKey                | -       | The color of the active bars in the indicator.                                                                                                                                                                 |
| `defaultColor` ?     | ColorKey                | -       | The color of the inactive bars in the indicator.                                                                                                                                                               |
| `testID` ?           | string                  | -       | The unique E2E test handler.                                                                                                                                                                                   |
| `...HTMLDivElement`? | Partial(HTMLDivElement) | -       | Props that will be passed to the root od the div element.                                                                                                                                                      |

## Examples

### React

```javascript
return <QualityIndicator icon="user" />;
```
