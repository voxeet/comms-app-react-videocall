# Notification

The Notification component is responsible for displaying informative text from messages from application.

## Props

| Name                 | Type                  | Default | Description                                               |
| -------------------- | --------------------- | ------- | --------------------------------------------------------- |
| `duration` ?         | number                | 4000    | Time of persist in the DOM in ms.                         |
| `notificationiId` ?  | number                | -       | Notification identifier.                                  |
| `message`            | string                | -       | Notification identifier.                                  |
| `variant`            | NotificationVariants  | -       | Type of notification.                                     |
| `callback`           | ()=> void)            | -       | Callback function to be invoke on closing notification.   |
| `instanceConfig`?    | number                | -       | Notification identifier.                                  |
| `position` ?         | Notification position | -       | Position of notifiaction.                                 |
| `width` ?            | number                | 320     | Width of Notification.                                    |
| `size` ?             | `s` / `m`             | `m`     | Size of the notification.                                 |
| `testID` ?           | string                | -       | Unique E2E test handler.                                  |
| `...HTMLDivElement`? | Partial(Space)        | -       | Props that will be passed to the root of the div element. |

## Examples

### React

```javascript
  <Notification message= "This is error message" variant={NotificationVariants.Error}  position={`top-left`}>
```
