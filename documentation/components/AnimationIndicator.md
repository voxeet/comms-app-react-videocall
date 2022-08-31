# AnimationIndicator

The AnimationIndicator component is responsible for indicating status update by playing a specific animation.

## Props

| Name                 | Type                    | Default | Description                                               |
| -------------------- | ----------------------- | ------- | --------------------------------------------------------- |
| `backgroundColor`?   | ColorKey                | -       | The background color of the indicator.                    |
| `contentColor` ?     | ColorKey                | -       | The color of the animation content.                       |
| `animationData`      | Record<string, unknown> | -       | The animation data which could be played by lottie-web
| `size` ?             | 's' , 'm'               | 'm'     | The size of the indicator.                                |
| `testID` ?           | string                  | -       | The unique E2E test handler.                              |
| `...HTMLDivElement`? | Partial(HTMLDivElement) | -       | Props that will be passed to the root of the div element. |

## Examples

### React

```javascript
import animationData from '<your lottie animation data path>'
return <AnimationIndicator animationData={animationData} />;
```
