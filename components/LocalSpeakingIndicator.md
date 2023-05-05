# LocalSpeakingIndicator

The LocalSpeakingIndicator component is responsible for displaying the speaking status of the local participant. The component can contain an icon and allows changing the background color of the indicator and the color of the icon.

## Props

| Name                       | Type     | Default | Description                                                                 |
| -------------------------- | -------- | ------- | --------------------------------------------------------------------------- |
| `activeBackgroundColor`?   | ColorKey | -       | The background color of the indicator when the participant is speaking.     |
| `inactiveBackgroundColor`? | ColorKey | -       | The background color of the indicator when the participant is not speaking. |
| `mutedBackgroundColor`?    | ColorKey | -       | The background color of the indicator when the participant is muted.        |
| `activeIconColor`?         | ColorKey | -       | The color of the icon on the indicator when participant is speaking.        |
| `inactiveIconColor`?       | ColorKey | -       | The color of the icon when participant is not speaking.                     |
| `mutedIconColor`?          | ColorKey | -       | The color of the icon when participant is muted.                            |
| `testID`?                  | string   | -       | The unique E2E test handler.                                                |

## Examples

### React

```javascript
return <LocalSpeakingIndicator inactiveBackgroundColor="secondary.700" inactiveIconColor="red.200" />;
```
