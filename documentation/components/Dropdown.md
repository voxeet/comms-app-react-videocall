# Dropdown

The Dropdown component is responsible for a drop-down list that allows selecting one of the available options. It has flexible API, so user can control rendered elements. Dropdown component uses compound components pattern. It is a main wrapper component and creates a state for all of the children components.

### Props

| Name                 | Type                      | Default | Description                                               |
| -------------------- | ------------------------- | ------- | --------------------------------------------------------- |
| `selected`           | DropdownOptionType / null | -       | The DropdownOptionType object or null.                    |
| `children`           | ReactNode                 | -       | The React nodes to be rendered as children.               |
| `...HTMLDivElement`? | Partial(HTMLDivElement)   | -       | Props that will be passed to the root of the div element. |

```javascript
return (
  <Dropdown selected={selectedDevice}>
    <DropdownLabel label="Label text" color="black" />
    <DropdownControl placeholder="Camera" />
    <DropdownList onChange={onChange} options={[
            {
              label: 'Camera A',
              value: 'camera-a',
              icon: 'camera',
            },
            {
              label: 'Camera B',
              value: 'camera-b',
              icon: 'camera',
            },
          ]} />
  </Dropdown>
);
```

## \<DropdownLabel />

The DropdownLabel component renders a label for a drop-down list.

### Props

| Name             | Type               | Default | Description                                                          |
| ---------------- | ------------------ | ------- | -------------------------------------------------------------------- |
| `label`          | string             | -       | The text of the label.                                               |
| `...TextProps` ? | Partial(TextProps) | -       | Props that will be passed to the Text component, inside DropdownLabel. |

## \<DropdownControl />

The DropdownControl component renders an element responsible for toggling visibility of a drop-down list.

### Props

| Name                     | Type                       | Default | Description                                                        |
| ------------------------ | -------------------------- | ------- | ------------------------------------------------------------------ |
| `placeholder`            | string                     | -       | The default text to display when the selected value is null.       |
| `color` ?                | ColorKey                   | -       | The color of the text.                                             |
| `borderColor` ?          | ColorKey                   | -       | The color of the box border.                                       |
| `...HTMLButtonElement` ? | Partial(HTMLButtonElement) | -       | Props that will be passed to the button tag, inside DropdownControl. |

## \<DropdownList />

The DropdownList component renders an element responsible for rendering a drop-down list.

### Props

| Name                | Type                                | Default | Description                                                                          |
| ------------------- | ----------------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `options`           | DropdownOptionType[]                | -       | The array of available options.                                                      |
| `onChange`          | (value: DropdownOptionType) => void | -       | A function to trigger when a participant selects an element from the drop-down list. |
| `color` ?           | ColorKey                            | -       | The color of the text.                                                               |
| `backgroundColor` ? | ColorKey                            | -       | The color of the background.                                                         |
