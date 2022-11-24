# LiveStreamingActionBar

Component responsible for rendering current live-streaming status.

## Props

| Name                        | Type                                                    | Default | Description                                                          |
| --------------------------- | ------------------------------------------------------- | ------- | -------------------------------------------------------------------- |
| `onActionSuccess`?          | ColorKey                                                | -       | Callback after resolving stop live-streaming action.                 |
| `statusLabels`              | Record<Status , string>                                 | -       | Labels for corresponding live-streaming statuses                     |
| `buttonLabels`              | Record<'active'/'error,ActionButtonLabels>              | -       | Labels for action buttons dependent on status                        |
| `streamingServiceLogo`?     | ReactNode                                               | -       | Logo component for actual service provider interpolated from uri key |
| `actions`                   | Record<'start' / 'stop', () => Promise<boolean> / void> | -       | Actions corresponding to specific statuses for live-streaming        |
| `compact`?                  | boolean                                                 | false   | Aligning width of action bar just for content                        |
| `testID` ?                  | string                                                  | -       | The unique E2E test handler.                                         |
| `...Space component props`? | ComponentProps<typeof Space>                            | -       | Props that will be passed to the root of the div element.            |

## Examples

### React

```javascript
return (
  <LiveStreamingActionBar
    actions={{
      start: () => startHandler(),
      stop: async () => stopHandler(),
    }}
    streamingServiceLogo={<Logo />}
    onClick={clickHandler}
    statusLabels={{
      active: 'streamingLabel',
      error: 'errorLabel',
      loading: `loadingLabel`,
      other: 'otherLabel',
    }}
    buttonLabels={{
      active: {
        label: 'buttonLabel',
      },
      error: {
        label: 'buttonLabel',
      },
    }}
    onActionSuccess={() => {
      if (streamingStatus === GenericStatus.Active) {
        showSuccessNotification('liveStreamingEnded');
      }
      if (streamingStatus === GenericStatus.Error) {
        showSuccessNotification('recordingSuccessfully');
      }
    }}
    guestLabel={streamingLabel}
  />
);
```
