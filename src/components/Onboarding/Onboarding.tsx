import { ungatedFeaturesEnabled } from '@src/utils/env';
import cx from 'classnames';
import FocusTrap from 'focus-trap-react';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { OnboardingTooltip, OnboardingTooltipProps } from '../OnboardingTooltip/OnboardingTooltip';

import styles from './Onboarding.module.scss';

let skipped = false;
const COMPLETED_ONBOARDINGS = new Set<string>();
const SPOTLIGHT_PADDING_PX = 8;

function getTooltipTransform(position: OnboardingTooltipProps['position'], targetRect: DOMRect) {
  if (position === undefined) {
    return undefined;
  }

  const transforms: string[] = [];

  if (position === 'left') {
    transforms.push(`translateY(${targetRect.height / 2}px)`);
  }

  if (position === 'right') {
    transforms.push(`translateX(${targetRect.width}px) translateY(${targetRect.height / 2}px)`);
  }

  if (position === 'top') {
    transforms.push(`translateX(${targetRect.width / 2}px)`);
  }

  if (position === 'bottom') {
    transforms.push(`translateY(${targetRect.height}px) translateX(${targetRect.width / 2}px)`);
  }

  return transforms.join(' ');
}

export type OnboardingStep = {
  /** The ID of the DOM element that the tooltip should point to. If omitted, `target` defaults to `document.body` and the tooltip will display in the top-left of the viewport. */
  target?: string;
  /** Text to display at the top of the tooltip */
  title: string;
  /** Content to display in the body of the tooltip */
  content: () => ReactNode;
  /** Where the tooltip should be displayed relative to the `target` */
  position?: OnboardingTooltipProps['position'];
  /** How the tooltip should be positioned relative to the tooltip arrow */
  align?: OnboardingTooltipProps['align'];
};

type OnboardingProps = {
  /** Name used to identify this onboarding tour. Used to make sure that a tour with the same name is only able to be activated once. */
  name: string;
  steps: OnboardingStep[];
  onComplete: () => void;
};

export const Onboarding = ({ name, steps, onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(0);
  const [target, setTarget] = useState<Element | null>();
  const currentStep = steps[step];

  const close = () => {
    COMPLETED_ONBOARDINGS.add(name);
    onComplete();
  };

  const skip = () => {
    skipped = true;
    onComplete();
  };

  const next = () => {
    if (step + 1 === steps.length) {
      COMPLETED_ONBOARDINGS.add(name);
      onComplete();
      return;
    }

    setStep(step + 1);
  };

  useEffect(() => {
    if (currentStep.target) {
      setTarget(document.getElementById(currentStep.target));
    }
  }, [currentStep]);

  if (COMPLETED_ONBOARDINGS.has(name) || skipped || !ungatedFeaturesEnabled()) {
    return null;
  }

  const rect = target?.getBoundingClientRect() ?? document.body.getBoundingClientRect();

  return createPortal(
    <>
      <div className={styles.overlay}>
        {target && (
          <div
            className={styles.spotlight}
            style={{
              height: rect.height + SPOTLIGHT_PADDING_PX * 2,
              width: rect.width + SPOTLIGHT_PADDING_PX * 2,
              left: rect.x - SPOTLIGHT_PADDING_PX,
              top: rect.y - SPOTLIGHT_PADDING_PX,
            }}
          />
        )}
      </div>
      <div
        className={cx(
          styles.tooltip,
          currentStep.position === undefined && styles.default,
          currentStep.position === 'top' && styles.top,
          currentStep.position === 'bottom' && styles.bottom,
          currentStep.position === 'left' && styles.left,
          currentStep.position === 'right' && styles.right,
        )}
        style={{
          left: rect.x,
          top: rect.y,
          transform: getTooltipTransform(currentStep.position, rect),
        }}
      >
        <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
          <OnboardingTooltip
            position={currentStep.position}
            align={currentStep.align}
            headerLabel={currentStep.title}
            primaryActionLabel={step === steps.length - 1 ? 'Got it' : 'Next'}
            secondaryActionLabel="Skip tour"
            step={step + 1}
            totalSteps={steps.length}
            onCloseClick={close}
            onPrimaryActionClick={next}
            onSecondaryActionClick={skip}
          >
            {currentStep.content()}
          </OnboardingTooltip>
        </FocusTrap>
      </div>
    </>,
    document.body,
  );
};
