# InfoBar

The InfoBar component is responsible showing information to the user .

## Props

| Name                 | Type                                                 | Default   | Description                                                                                                                                                                    |
| -------------------- | ---------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `iconName`?          | string                                               | 'info'    | The name of the SVG icon                                                                                                                                                       |
| `iconColor`?         | ColorKey                                             | 'white'   | The color of the icon                                                                                                                                                          |
| `text`               | string                                               | -         | The title of the InfoBar                                                                                                                                                       |
| `textColor`?         | ColorKey                                             | 'white'   | The color of text                                                                                                                                                              |
| `variant`?           | 'default' / 'info' / 'success' / 'warning' / 'error' | 'default' | variant of the InfoBar, when it's not 'default', the InfoBar will not disappear after 3 seconds but it will include a close button on the right end and display a preset icon. |
| `testID` ?           | string                                               | -         | The unique E2E test handler.                                                                                                                                                   |
| `duration`           | number                                               | 2000      | Time to live for InfoBar                                                                                                                                                       |
| `alwaysVisible`      | boolean                                              | false     | Informs that InfoBar will be always visible.                                                                                                                                   |
| `...HTMLDivElement`? | Partial(HTMLDivElement)                              | -         | Props that will be passed to the root of the div element.                                                                                                                      |
A callback function which will run when the Infobar is completely invisible

## Examples

### React

```javascript
return (
  <div>
    <InfoBar iconName="camera" text="Any text regarding camera" />
  </div>
);
```

or Info variant

```javascript
return (
  <div>
    <InfoBar text="Any text regarding camera" variant="info" duration={3000} />
  </div>
);
```
