# IconButton

The IconButton component is responsible for rectangular buttons that contain icons.

## Props

| Name                    | Type                              | Default  | Description                                                                                            |
| ----------------------- | --------------------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `variant` ?             | 'square', 'rectangular', 'circle' | 'square' | The variant of style that allows you to distinguish between actions of different importance in the UI. |
| `backgroundColor` ?     | ColorKey , [ColorKey, ColorKey]   | -        | The background color of the button.                                                                    |
| `iconColor` ?           | ColorKey                          | -        | The color of the icon.                                                                                 |
| `badge` ?               | boolean                           | false    | The small circular indicator that appears at the top of the button.                                    |
| `badgeColor` ?          | ColorKey                          | -        | The color of the badge.                                                                                |
| `badgeContentColor` ?   | ColorKey                          | -        | The color of text that appears is in the badge.                                                        |
| `strokeColor` ?         | ColorKey                          | -        | The color of the button's border.                                                                      |
| `size` ?                | 'xxs' , 'xs' , 's' , 'm'          | 'm'      | The size of the button.                                                                                |
| `disabled` ?            | boolean                           | false    | The activity state.                                                                                    |
| `icon`                  | Icon                              | -        | The name of the icon.                                                                                  |
| `onClick`               | Function                          | -        | The event handler property for processing click events on the button.                                  |
| `testID` ?              | string                            | -        | The unique E2E test handler.                                                                           |
| `style` ?               | CSSProperties                     | -        | The style of the layout.                                                                               |
| `...HTMLButtonElement`? | Partial(HTMLDivElement)           | -        | Props that will be passed to the root of the button element.                                           |

## Examples

### React

```javascript
return <IconButton variant="rectangular" icon="speaker" />;
```
