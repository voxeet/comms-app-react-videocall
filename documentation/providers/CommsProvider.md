# CommsProvider

The CommsProvider is a mandatory wrapper that is responsible for the initialization token.

For more information about the initialization process, see the [Dolby.io documentation](https://docs.dolby.io/communications-apis/docs/initializing-javascript#initialize-the-sdk).

## Props

| Name                | Type                  | Description                                                                                                                                   |
| ------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`          | ReactNode             | The content of the application.                                                                                                               |
| `token`             | string                | The initialization token. Learn more from [here](https://docs.dolby.io/communications-apis/docs/overview-developer-tools#client-access-token) |
| `refreshToken`      | () => Promise<string> | Refreshes the token.                                                                                                                          |
| `packageUrlPrefix`? | string                | Sets VoxeetSDK packageUrlPrefix value.                                                                                                        |

## Examples

### React

```javascript
// Generate a client access token from the Dolby.io dashboard and insert into access_token variable
let access_token = 'ClientAccessToken';
const refreshToken = async () => {
  // fetch a new token from server and return it
};
return (
  <CommsProvider token={access_token} refreshToken={refreshToken}>
    ...
  </CommsProvider>
);
```
