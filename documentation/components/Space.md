# Space

The Space component is responsible for adding margins and paddings. The component wraps other components.

## Props

| Name        | Type                 | Default | Description                                                |
| ----------- | -------------------- | ------- | ---------------------------------------------------------- |
| `fw`?       | boolean              | false   | The full width.                                            |
| `fh`?       | boolean              | false   | The full height.                                           |
| `style`?    | React.CSSProperties  | -       | The style of the layout.                                   |
| `tag`?      | 'div' , 'span' , 'p' | "div"   | The selected HTML tag.                                     |
| `children`? | React.ReactNode      | -       | The content of the Space component.                        |
| `m`?        | SpaceValues          | -       | The preferred margin, either top, right, bottom, or left.  |
| `mv`?       | SpaceValues          | -       | The vertical margin, either top or bottom.                 |
| `mh`?       | SpaceValues          | -       | The top margin.                                            |
| `mr`?       | SpaceValues          | -       | The right margin.                                          |
| `mb`?       | SpaceValues          | -       | The bottom margin.                                         |
| `ml`?       | SpaceValues          | -       | The left margin.                                           |
| `p`?        | SpaceValues          | -       | The preferred padding, either top, right, bottom, or left. |
| `pv`?       | SpaceValues          | -       | The vertical padding vertical, either top or bottom.       |
| `ph`?       | SpaceValues          | -       | The horizontal padding horizontal, either left or right.   |
| `pt`?       | SpaceValues          | -       | The top padding.                                           |
| `pr`?       | SpaceValues          | -       | The right padding.                                         |
| `pb`?       | SpaceValues          | -       | The bottom padding.                                        |
| `pl`?       | SpaceValues          | -       | The left padding.                                          |
| `testID`?   | string               | -       | The unique E2E test handler.                               |

## Examples

### React

```javascript
return (
  <Space mt="m" pv="xs">
    <p>Hello World!</p>
  </Space>
);
```
