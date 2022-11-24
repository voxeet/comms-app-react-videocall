# ActionBar

The wrapper abstraction over Space component for sharing / recording action bar.

## Props

| Name                | Type                         | Default | Description                                               |
|---------------------|------------------------------|---------|-----------------------------------------------------------|
| `children`          | ReactNode                    | -       | The content of the component.                             |
| `actionButtonCallback`? | ()=> void                    | _       | Action button callback                                    |
| `actionButtonLabels` | ActionButtonLabels           | _       | Labels for Action Button                                  |
| `closeCallback`?    | ()=>void                     | _       | Callback for close button for right container             |
| `onMount`?          | ()=>void                     | _       | Callback invoked while actionbar is mounted               |
| `unified`?          | boolean                      | _       | Unified action bar for all breakpoints                    |
| `compact`?          | boolean                      | _       | Aligning width to content                                 |
| `...Space component props`? | ComponentProps<typeof Space> | -       | Props that will be passed to the root of the div element. |

## Examples

### React

```javascript
return <ActionBar actionButtonCallback={()=>{}} actionButtonLabels={{label: 'Click me'}}>...status elements </>;
```
