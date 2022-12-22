# Icon

The Icon component is responsible for displaying icon files in SVG format.

## Props

| Name                 | Type                                 | Default   | Description                                               |
| -------------------- | ------------------------------------ | --------- | --------------------------------------------------------- |
| `name`               | IconComponentName                    | -         | The name of the icon file.                                |
| `color`?             | ColorKey                             | -         | The color of the icon.                                    |
| `colorTone`?         | 'light' / 'default' / 'dark'         | 'default' | The color tone of the icon.                               |
| `size`?              | 'xxs' / 'xs' / 's' / 'm' / 'l' / 'xl | 'm'       | The size of the icon.                                     |
| `testID`?            | string                               | -         | The unique E2E test handler.                              |
| `...HTMLDivElement`? | Partial(HTMLDivElement)              | -         | Props that will be passed to the root of the div element. |

## Available icons

| Name            | Icon                                             |
| --------------- | ------------------------------------------------ |
| camera          | ![Alt text](./IconComponents/Camera.tsx)         |
| camera-off      | ![Alt text](./IconComponents/CameraOff.tsx)      |
| camera-reverse  | ![Alt text](./IconComponents/CameraReverse.tsx)  |
| chat            | ![Alt text](./IconComponents/Chat.tsx)           |
| copy            | ![Alt text](./IconComponents/Copy.tsx)           |
| dots-horizontal | ![Alt text](./IconComponents/DotsHorizontal.tsx) |
| dots-vertical   | ![Alt text](./IconComponents/DotsVertical.tsx)   |
| handset         | ![Alt text](./IconComponents/Handset.tsx)        |
| headphones      | ![Alt text](./IconComponents/Headphones.tsx)     |
| info            | ![Alt text](./IconComponents/info.tsx)           |
| microphone      | ![Alt text](./IconComponents/Microphone.tsx)     |
| microphone-off  | ![Alt text](./IconComponents/Microphone-off.tsx) |
| participants    | ![Alt text](./IconComponents/Participants.tsx)   |
| pin             | ![Alt text](./IconComponents/Pin.tsx)            |
| present         | ![Alt text](./IconComponents/Present.tsx)        |
| record          | ![Alt text](./IconComponents/Record.tsx)         |
| send-message    | ![Alt text](./IconComponents/Send-message.tsx)   |
| settings        | ![Alt text](./IconComponents/Settings.tsx)       |
| speaker         | ![Alt text](./IconComponents/Speaker.tsx)        |
| speaker-off     | ![Alt text](./IconComponents/Speaker-off.tsx)    |
| tune            | ![Alt text](./IconComponents/Tune.tsx)           |
| stream          | ![Alt text](./IconComponents/Stream.tsx)         |

## Examples

### React

```javascript
return <Icon name="user" color="white" />;
```
