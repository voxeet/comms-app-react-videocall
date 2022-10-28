# RecordingActionBar

Component responsible for rendering current recording status.

## Props

| Name                        | Type                                             | Default | Description                                               |
|-----------------------------|--------------------------------------------------|---------|-----------------------------------------------------------|
| `onActionSuccess`?          | ColorKey                                         | -       | Callback after resolving stop recording action.           |
| `statusLabels`              | Record<Status , string>                          | -       | Labels for corresponding recording statuses               |
| `buttonLabels`              | Record<Status,{tooltip?: string, label: string}> | -       | Labels for action buttons dependent on status             |
| `compact`?                  | boolean                                          | false   | Aligning width of action bar just for content             |
| `testID` ?                  | string                                           | -       | The unique E2E test handler.                              |
| `...Space component props`? | ComponentProps<typeof Space>                     | -       | Props that will be passed to the root of the div element. |

## Examples

### React

```javascript
return (
  <RecordingActionBar
    statusLabels={{
      active: `localized string`,
      error: `localized string`,
      loading: `localized string...`,
      other: `localized string`,
    }}
    buttonLabels={{
      active: {
        tooltip: `localized string`,
        label: `localized string`,
      },
      error: {
        tooltip: `localized string`,
        label: `localized string`,
      },
    }}
    onActionSuccess={() => alert('Screen sharing stopped')}
    guestLabel={`localized string`}
  />
);
```
