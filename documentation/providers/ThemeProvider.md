# ThemeProvider

The ThemeProvider is a wrapper that is responsible for themes.

## Props

| Name           | Type         | Description                     |
| -------------- | ------------ | ------------------------------- |
| `children`     | ReactNode    | The content of the application. |
| `theme`        | Object       | Overwrites themes.              |
| `customThemes` | CustomThemes | Add new theme modes.            |

## Examples

### React

```javascript
return (
  <ThemeProvider
    theme={{
      colors: {
        black: '#000000',
      },
    }}
  >
    ...
  </ThemeProvider>
);
```
