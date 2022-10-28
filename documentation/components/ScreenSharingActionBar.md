# ScreenSharingActionBar

Component responsible for rendering current sharing stream status display.

## Props

| Name                        | Type                              | Default | Description                                               |
|-----------------------------|-----------------------------------|---------|-----------------------------------------------------------|
| `guestLabel`?               | string                            | -       | Description for not local presenter                       |
| `onActionSuccess`?          | ColorKey                          | -       | Callback after resolving stop sharing action.             |
| `statusLabels`              | Record<Status , string>           | -       | Labels for corresponding sharing statuses                 |
| `buttonLabels`              | {tooltip?: string, label: string} | -       | Labels for action button                                  |
| `compact`?                  | boolean                           | false   | Aligning width of action bar just for content             |
| `testID` ?                  | string                            | -       | The unique E2E test handler.                              |
| `...Space component props`? | ComponentProps<typeof Space>      | -       | Props that will be passed to the root of the div element. |

## Examples

### React

```javascript
return (
  <ScreenSharingActionBar
    statusLabels={{
      active: `localized string`,
      error: `localized string`,
      loading: `localized string...`,
      other: `localized string`,
    }}
    buttonLabels={{
      tooltip: `localized string`,
      label: `localized string`,
    }}
    onActionSuccess={() => alert('Screen sharing stopped')}
    guestLabel={`localized string`}
  />
);
```
