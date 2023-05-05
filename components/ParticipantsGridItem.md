# ParticipantsGridItem

The ParticipantsGridItem component is responsible for displaying participant's video tiles that can be rendered in the grid tile layout.

## Props

| Name          | Type        | Default | Description                                                                                   |
| ------------- | ----------- | ------- | --------------------------------------------------------------------------------------------- |
| `localText`   | string      | -       | The preferred text to display next to the local participant's video tile, for example, "You". |
| `participant` | Participant | -       | The Participant object.                                                                       |

## Examples

### React

```javascript
return <ParticipantsGridItem localText="you" participant={Participant} />;
```
