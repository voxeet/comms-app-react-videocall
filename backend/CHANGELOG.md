# dolby-api-proxy

## 1.2.0

### Minor Changes

- 399b73ce: - Refactor PubNub code
  - Add "Host"/"(You)" labels to chat messages
- 3fda9630: Implement promoting viewers to host

## 1.1.0

### Minor Changes

- d43caf7e: Use PubNub SDK in api-proxy
- c9de6141: Handle invalid PubNub keys
- d43caf7e: - Add ability for hosts to delete chat messages
- c16a826b: Update events app to run the backend server by default with a single script
- 545f1dcd: - Hide the Participants and Chat buttons in the viewer if the event isn't live
  - When using the `env` utility function, if the environment variable is not found, we no longer throw an error. This was done because omitting the new PubNub environment variables shouldn't block `api-proxy` or `events` from starting.
  - Because of the above, I've also refactored `api-proxy` a bit so that each file in `routes` exports a factory function that returns an Express router. Doing it this way lets us pass in the environment variables which provides better type safety and allows the consumer (in this case, `getApp()`) to handle missing environment variables.
  - Make `subscribe` in `CommsProvider` use `useCallback` to prevent subscriptions from unsubscribing and resubscribing

### Patch Changes

- 96f5021e: Use node fetch for requests - this makes it more compatible with older versions of node
- 695a9a5c: Updated dependencies
