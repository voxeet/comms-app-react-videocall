import { OnboardingStep } from '@components/Onboarding/Onboarding';

export const conferenceSteps: OnboardingStep[] = [
  {
    target: 'CopyButton',
    title: 'Invite Participants',
    content: () => <>To invite participants, copy and share this link.</>,
    position: 'top',
    align: 'start',
  },
  {
    target: 'Dock',
    title: 'Mic, Camera, and Screen controls',
    content: () => <>Control your camera and mic, share your screen, or record your call.</>,
    position: 'top',
  },
  {
    target: 'BackgroundBlurSwitch',
    title: 'Background Blur',
    content: () => <>Toggle here to blur your background.</>,
    position: 'top',
  },
  {
    target: 'MusicModeButton',
    title: 'Music mode',
    content: () => (
      <>For music-specific calls or conferences, enable the Music Mode for a immersive, full bandwidth sound.</>
    ),
    position: 'top',
    align: 'end',
  },
  {
    target: 'LiveStreamButton',
    title: 'Live streaming',
    content: () => <>Live stream to a larger audience via RTMP.</>,
    position: 'top',
    align: 'end',
  },

  {
    target: 'OpenDrawerButton',
    title: 'Participants',
    content: () => <>See who has joined the call.</>,
    position: 'top',
    align: 'end',
  },
  {
    target: 'OpenSettingsButton',
    title: 'Settings',
    content: () => <>View and adjust settings.</>,
    position: 'top',
    align: 'end',
  },
];
