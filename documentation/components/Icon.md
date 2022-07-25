# Icon

The Icon component is responsible for displaying icon files in SVG format.

## Props

| Name                 | Type                         | Default   | Description                                               |
| -------------------- | ---------------------------- | --------- | --------------------------------------------------------- |
| `name`               | IconsKeys                    | -         | The name of the icon file.                                |
| `color`?             | ColorKey                     | -         | The color of the icon.                                    |
| `colorTone`?         | 'light' / 'default' / 'dark' | 'default' | The color tone of the icon.                               |
| `size`?              | 'xxs' / 'xs' / 's' / 'm'     | 'm'       | The size of the icon.                                     |
| `testID`?            | string                       | -         | The unique E2E test handler.                              |
| `...HTMLDivElement`? | Partial(HTMLDivElement)      | -         | Props that will be passed to the root of the div element. |

## Available icons

| Name            | Icon                                                                    |
| --------------- | ----------------------------------------------------------------------- |
| camera          | ![Alt text](../../packages/common/src/assets/icons/camera.svg)          |
| camera-off      | ![Alt text](../../packages/common/src/assets/icons/camera-off.svg)      |
| camera-reverse  | ![Alt text](../../packages/common/src/assets/icons/camera-reverse.svg)  |
| chat            | ![Alt text](../../packages/common/src/assets/icons/chat.svg)            |
| copy            | ![Alt text](../../packages/common/src/assets/icons/copy.svg)            |
| dots-horizontal | ![Alt text](../../packages/common/src/assets/icons/dots-horizontal.svg) |
| dots-vertical   | ![Alt text](../../packages/common/src/assets/icons/dots-vertical.svg)   |
| handset         | ![Alt text](../../packages/common/src/assets/icons/handset.svg)         |
| headphones      | ![Alt text](../../packages/common/src/assets/icons/headphones.svg)      |
| info            | ![Alt text](../../packages/common/src/assets/icons/info.svg)            |
| microphone      | ![Alt text](../../packages/common/src/assets/icons/microphone.svg)      |
| microphone-off  | ![Alt text](../../packages/common/src/assets/icons/microphone-off.svg)  |
| participants    | ![Alt text](../../packages/common/src/assets/icons/participants.svg)    |
| pin             | ![Alt text](../../packages/common/src/assets/icons/pin.svg)             |
| present         | ![Alt text](../../packages/common/src/assets/icons/present.svg)         |
| record          | ![Alt text](../../packages/common/src/assets/icons/record.svg)          |
| send-message    | ![Alt text](../../packages/common/src/assets/icons/send-message.svg)    |
| settings        | ![Alt text](../../packages/common/src/assets/icons/settings.svg)        |
| speaker         | ![Alt text](../../packages/common/src/assets/icons/speaker.svg)         |
| speaker-off     | ![Alt text](../../packages/common/src/assets/icons/speaker-off.svg)     |

## Examples

### React

```javascript
return <Icon name="user" color="white" />;
```
