# ScreenSharingPresentationBox

The ScreenSharingPresentationBox component is responsible for presenting screen share data. By default it takes 100% of parent width and height.

## Props

| Name                     | Type            | Default    | Description                                                       |
| ------------------------ | --------------- | ---------- | ----------------------------------------------------------------- |
| `customFallbackContent`? | React.ReactNode | -          | Custom fallback when is problem with stream or some error exists. |
| `fallbackText`           | string          | -          | Text which will be displayed in default fallback.                 |
| `fallbackButtonText`?    | string          | -          | Text which will be displayed in default fallback button.          |
| `backgroundColor`?       | ColorKey        | "grey.800" | Background color of container.                                    |
| `testID`?                | string          | -          | Unique e2e identifier.                                            |

## Examples

### React

```javascript
const customFallbackContent = (
  <Space>
    <Text>Custom Fallback Content</Text>
  </Space>
);

return (
  <ScreenSharingPresentationBox
    customFallbackContent={customFallbackContent}
    fallbackText="Screen share error"
    fallbackButtonText="Try again"
    testID="ScreenSharingPresentationBox"
  />
);
```
