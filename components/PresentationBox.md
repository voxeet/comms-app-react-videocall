# PresentationBox

The PresentationBox component is responsible for presenting shared data. By default it takes 100% of parent width and height.

## Props

| Name                           | Type                                   | Default  | Description                                                               |
| ------------------------------ | -------------------------------------- | -------- | ------------------------------------------------------------------------- |
| `stream`                       | MediaStreamWithType / undefined / null | -        | Stream that should be shared in box.                                      |
| `fallbackContent`              | React.ReactNode                        | -        | Fallback which appears when is problem with stream or exists some errors. |
| `isError`?                     | boolean                                | false    | Indicated if error exists.                                                |
| `isLocalUserPresentationOwner` | boolean                                | false    | Indicated if local user is presentation owner.                            |
| `backgroundColor`?             | ColorKey                               | grey.800 | Background color of container.                                            |
| `style`?                       | React.CSSProperties                    | -        | Style properties.                                                         |
| `testID`?                      | string                                 | -        | Unique e2e identifier.                                                    |

## Examples

### React

```javascript
const defaultFallbackContent = (
  <Space>
    <Text>Default Fallback Content</Text>
  </Space>
);

return <PresentationBox stream={screenShareStream} fallbackContent={defaultFallbackContent} />;
```
