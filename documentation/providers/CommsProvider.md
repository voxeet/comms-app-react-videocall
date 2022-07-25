# CommsProvider

The CommsProvider is a mandatory wrapper that is responsible for the initialization token.

For more information about the initialization process, see the [Dolby.io documentation](https://docs.dolby.io/communications-apis/docs/initializing-javascript#initialize-the-sdk).

## Props

| Name           | Type                  | Description                     |
| -------------- | --------------------- | ------------------------------- |
| `children`     | ReactNode             | The content of the application. |
| `token`        | string                | The initialization token.       |
| `refreshToken` | () => Promise<string> | Refreshes the token.            |

## Examples

### React

```javascript
return (
  <CommsProvider
    token={XXX}
    refreshToken={...}
  >
    ...
  </CommsProvider>
);
```
