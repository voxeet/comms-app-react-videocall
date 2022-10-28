# Status

Status is a component which presents share / recording status. It must be feed with proper label, indicator color and icon/avatar.
Positioning is based on props

## Props

| Name              | Type               | Default | Description                                          |
|-------------------|--------------------|---------|------------------------------------------------------|
| `label`           | string / ReactNode | -       | The description label of the component.              |
| `icon`            | IconComponentName  | -       | Icon name for displaying for feeding Icon component. |
| `avatar` ?        | ReactNode          | -       | Avatar component. It is prioritised over Icon        |
| `testID` ?        | string             | -       | The unique E2E test handler.                         |
| `statusDotColor`? | ColorKey           | -       | Color of the indicator dot.                          |

## Examples

### React

```javascript
return <Status statusDotColor={'infoSuccess'} icon="present" label={'sharing status label'} />;
```
