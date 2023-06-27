import { OnboardingStep } from '@components/Onboarding/Onboarding';

export const hostDeviceSetupSteps: OnboardingStep[] = [
  {
    target: 'JoinButton',
    title: 'Start your call',
    content: () => (
      <>Click the &quot;Join Now&quot; button to enter. Adjust your mic and camera in by clicking the Settings icon.</>
    ),
    position: 'left',
  },
];
