# useNotifications

The useNotifications hook expose notifications as well as handlers to remove / display notifications.

```javascript
import { useNotifications } from '@dolbyio/comms-uikit-react';
```

## Members

| Name                            | Type                                                                             | Description                                               |
| ------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `showNotification`              | (Omit<Notification, `id`>) => void                                               | Display notification in notification center.              |
| `showSuccessNotification`       | (message : string , instanceConfig?: NotificationBase[`instanceConfig`]) => void | Display success type notification in notification center. |
| `showWarningNotification`       | (message : string , instanceConfig?: NotificationBase[`instanceConfig`]) => void | Display warning type notification in notification center. |
| `showErrorNotification`         | (message : string , instanceConfig?: NotificationBase[`instanceConfig`]) => void | Display error type notification in notification center.   |
| `showInfoNotification`          | (message : string , instanceConfig?: NotificationBase[`instanceConfig`]) => void | Display info type notification in notification center.    |
| `removeNotification`            | (id: number) => void                                                             | Remove notification from notification center.             |
| `notifications`                 | Notification[]                                                                   | Array of actual notifications.                            |
| `shouldShowNotificationsCenter` | boolean                                                                          | Returns if there is a content to display                  |

## Examples

### React

### Show notification

```javascript
const { showNotification } = useNotifications();

showNotification({
  message: `Session closed`,
  variant: 'warning',
});

showSuccessNotification('This is a success notification');
```

> Values for `variant` include `"success"`, `"warning"`,`"error"`,`"info"` or `"neutral"`

### RemoveNotification

```javascript
const { removeNotification } = useNotification();

const onClick = () => {
  removeNotification(notification.id);
};

<button onClick={onClick}>...</button>;
```

### Notifications

```javascript
const { notifications } = useNotifications();

notifications.map((notification) => <p>{notification.message}</p>);
```
