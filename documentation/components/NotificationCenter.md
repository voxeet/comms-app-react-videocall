# NotificationCenter

NotificationCenter component is responsible for displaying notification messages from app.

## Props

| Name                                     | Type                           | Default      | Description                                   |
|------------------------------------------|--------------------------------|--------------|-----------------------------------------------|
| `position` ?                             | NotificationPositions          | `top-center` | Position of Notification container            |
| `additionalNotificationContainerProps` ? | Partial(Space Component props) | -            | Additional props for Notification container   |
| `duration` ?                             | number                         | -            | Time to live for each notification            |
| `notificationWidth` ?                    | number                         | -            | Overwrites default notification width (320px) |
| `notificationSize` ?                     | `s` / `m`                      | `m`          | Notification size                             |
| `testID` ?                               | string                         | -            | The unique E2E test handler.                  |

## Examples

### React

```javascript
<CommsProvider>
  <ThemeProvider>
    ...
    <NotificationCenter />
  </ThemeProvider>
</CommsProvider>
```
