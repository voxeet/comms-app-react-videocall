## Design principles

This document contains a list of rules that help with designing UI components in a way that unifies elements of these components to achieve a high quality of software.

### Hooks (5)

- Hooks should reflect the functions of the system
- Hooks should export functions or entities
- If possible, hooks should use global context data instead of invoking SDK
- Every hook name should start with 'use' (lower case)
- Function names should start with a verb (switchSpeaker instead of speakerSwitch)
- Hooks should not render anything or return render functions

### Components (17)

- Components should reflect functions responsible for rendering UI elements
- UI Components should not invoke SDK methods
- UI Components should not use any hooks from UI components except useTheme
- Every component should implement a theme and rely on useTheme variables
- Names of components should not contain phrases connected with logic
- Every component should implement a testID string property due to E2E reasons
- The web E2E handlers are created using the data-testid attribute
- If a component exists in several sizes, it needs to implement the size property
- If a component exists in several colors, it needs to implement the color property
- If a component has several visual configuration options, it needs to be exposed with props, for example, 'backgroundColor' or 'textColor'
- The useTheme hook offers the getColor method that based on the provided key that represents the color name, for example, 'black', gets the hex color code
- Props connected with function execution on specific action should have names that start with 'on', for example, onChange or onClick
- A component's APIs should be consistent across web and mobile platforms, except a situation when there is a clear pattern specific to a platform (onClick vs onPress) or some actions are not available on a specific platform
- States of components should be exposed with boolean props, for example, 'active', 'hidden', or 'disabled', where the logic for each state needs to be established by the user
- Names of components should communicate the character of UI and be aligned with the most popular UI packages, for example, 'Pill' instead of 'TagName'
- Components that render lists or grids are allowed to expose methods that overwrite the default renderItem method that renders positions
