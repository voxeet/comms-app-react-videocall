# Toast

The Toast component is responsible for notifications.

## Props

| Name                 | Type                    | Default         | Description                                                                                                     |
| -------------------- | ----------------------- | --------------- | --------------------------------------------------------------------------------------------------------------- |
| `iconName`?           | string                 |  'info'      | The name of the SVG icon
| `iconColor`?          | ColorKey               |  'white'     | The color of the icon
| `text`               | string                  |              | The title of the toast
| `textColor`?         | ColorKey                | 'white'      | The color of text
| `variant`?           | 'default' / 'info' / 'success' / 'warning' / 'error'                | 'default'               | variant of the toast, when it's not 'default', the toast will not disappear after 3 seconds but it will include a close button on the right end and display a preset icon.
| `testID` ?           | string                  | -               | The unique E2E test handler.                                                                                    |
| `...HTMLDivElement`? | Partial(HTMLDivElement) | -               | Props that will be passed to the root of the div element.                                                       |

## Examples

### React

```javascript
return (
  <div>
    <Toast iconName="camera" text="Any text regarding camera"/>
  </div>
);
```

or Info variant

```javascript
return (
  <div>
    <Toast text="Any text regarding camera" variant="info"/>
  </div>
);
```
