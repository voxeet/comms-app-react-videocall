# useTheme

The useTheme hook gathers functions responsible for managing themes.

## Members

| Name                 | Type                | Description                                                                      |
| -------------------- | ------------------- | -------------------------------------------------------------------------------- |
| `theme`              | Theme               | Gets the theme object.                                                           |
| `themes`             | CustomThemes        | Gets the object of themes in project.                                            |
| `activeTheme`        | string              | Gets the currently used theme mode name.                                         |
| `availableThemes`    | string[]            | Gets array of available theme names.                                             |
| `setActiveTheme`     | (ThemeMode) => void | Sets a theme mode.                                                               |
| `getColorOrGradient` | (string) => string  | Gets the gradient of the provided colors or the color that is used in the theme. |
| `getColor`           | (string) => string  | Gets the color of the theme.                                                     |
| `getGradient`        | (string) => string  | Gets the gradient value of the theme.                                            |

## Examples

### React

### Style element with some theme color - recommend to use getColor/getGradient/getColorOrGradient methods

```javascript
const { theme } = useTheme();

<div style={{ backgroundColor: theme.colors.grey[500] }}>...</div>;
```

### Display list of themes

```javascript
const { themes } = useTheme();

console.log(themes);
```

### Display name of active theme

```javascript
const { activeTheme } = useTheme();

<p>{activeTheme}</p>;
```

### Display list of themes

```javascript
const { availableThemes } = useTheme();

console.log(availableThemes);
```

### Set active theme

```javascript
const { setActiveTheme } = useTheme();

const changeTheme = (themeName) => {
  setActiveTheme(themeName);
};

<button onClick={() => changeTheme('deepPurple')}>...</button>;
```

### Get color

```javascript
const { getColorOrGradient } = useTheme();


const color = "primary.500"
const gradient = [ "primary.500" , "secondary.500" ]

<button style={{background: getColorOrGradient(color) }}>...</button>;
<div style={{background: getColorOrGradient(gradient) }}>...</div>;
```

### Ger color using getColor method

```javascript
const { getColor } = useTheme();


const color = "primary.500"

<button style={{background: getColor(color) }}>...</button>;
```

### Get gradient color

```javascript
const { getGradient } = useTheme();


const gradient = [ "primary.500" , "secondary.500" ]

<button style={{background: getGradient(gradient) }}>...</button>;
```
