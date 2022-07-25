# CopyConferenceLinkButton

The CopyConferenceLinkButton component is responsible for copying the conference URL to a user's clipboard.

## Props

| Name                  | Type                     | Default | Description                                                                                                   |
| --------------------- | ------------------------ | ------- | ------------------------------------------------------------------------------------------------------------- |
| `url`                 | string                   | -       | The conference URL that will be copied to clipboard after clicking.                                           |
| `tooltipText`         | string                   | -       | The informative text to display inside the Tooltip component.                                                 |
| `successText`         | string                   | -       | The text to display for one second in the Tooltip component after a successful completion of the copy action. |
| `tooltipPosition`?    | TooltipProps['position'] | top     | The position of the Tooltip element.                                                                          |
| `...IconButtonProps`? | Partial(IconButtonProps) | -       | Props to pass to the IconButton component.                                                                    |
| `testID` ?            | string                   | -       | The unique E2E test handler.                                                                                  |

## Examples

### React

```javascript
const [isLoading, setIsLoading] = useState(false);

const onSuccess = () => {
  navigate('conference');
};

if (isLoading) {
  return <Loader />;
}

return <CopyConferenceLinkButton onStart={setIsLoading} onSuccess={onSuccess} text="Copy" testID="CopyButton" />;
```
