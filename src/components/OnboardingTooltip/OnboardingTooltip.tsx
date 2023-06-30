import Text from '@components/Text';
import { Button, IconButton, Space } from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import { forwardRef, ReactNode } from 'react';

import styles from './OnboardingTooltip.module.scss';

const ARROW_HEIGHT_PX = 16;
const ALIGN_START_PERCENT = 35;
const ALIGN_END_PERCENT = ALIGN_START_PERCENT * -1;

function getTooltipTransform(position: OnboardingTooltipProps['position'], align: OnboardingTooltipProps['align']) {
  if (position === undefined) {
    return undefined;
  }

  const transforms: string[] = [`translate(-50%, -50%)`];

  if (position === 'left' || position === 'right') {
    const sign = position === 'left' ? -1 : 1;
    transforms.push(`translateX(${50 * sign}%)`, `translateX(${ARROW_HEIGHT_PX * sign}px)`);
    if (align) {
      transforms.push(`translateY(${align === 'start' ? ALIGN_START_PERCENT : ALIGN_END_PERCENT}%)`);
    }
  }

  if (position === 'top' || position === 'bottom') {
    const sign = position === 'top' ? -1 : 1;
    transforms.push(`translateY(${50 * sign}%)`, `translateY(${ARROW_HEIGHT_PX * sign}px)`);
    if (align) {
      transforms.push(`translateX(${align === 'start' ? ALIGN_START_PERCENT : ALIGN_END_PERCENT}%)`);
    }
  }

  return transforms.join(' ');
}

export type OnboardingTooltipProps = {
  /** Where the tooltip should be relative to the element it is attached to. For example, if the tooltip should be below the element, use `bottom`. If this is set to `none`, an arrow will not be displayed. */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Alignment of the tooltip body. Use this to position the tooltip body relative to the arrow. For example, if `position` is `left` and you want the arrow to be at the bottom, use `align: end`. Has no effect if `position` is not set. */
  align?: 'start' | 'end';
  /** Text to display at the top of the tooltip */
  headerLabel: string;
  /** Text to display for the primary action button */
  primaryActionLabel: string;
  /** Text to display for the secondary action button */
  secondaryActionLabel: string;
  /** The current step */
  step: number;
  /** Total number of steps */
  totalSteps: number;
  /** Callback to execute when the close button is clicked */
  onCloseClick: () => void;
  /** Callback to execute when the primary action button is clicked */
  onPrimaryActionClick: () => void;
  /** Callback to execute when the secondary action button is clicked */
  onSecondaryActionClick?: () => void;
  children: ReactNode;
};

export const OnboardingTooltip = forwardRef<HTMLDivElement, OnboardingTooltipProps>(
  (
    {
      position,
      align,
      headerLabel,
      primaryActionLabel,
      secondaryActionLabel,
      step,
      totalSteps,
      onCloseClick,
      onPrimaryActionClick,
      onSecondaryActionClick,
      children,
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cx(styles.wrapper, position && styles.arrowVisible)}>
        <div
          className={cx(
            styles.arrow,
            position === 'top' && styles.top,
            position === 'bottom' && styles.bottom,
            position === 'left' && styles.left,
            position === 'right' && styles.right,
          )}
        />
        <div className={styles.tooltip} style={{ transform: getTooltipTransform(position, align) }}>
          <div className={styles.close}>
            <IconButton backgroundColor="white" iconColor="grey.300" size="xs" icon="close" onClick={onCloseClick} />
          </div>
          <Text color="black" type={step === 1 ? 'h6' : 'paragraphExtraSmall'}>
            {headerLabel}
          </Text>
          <Space pv={step === 1 ? 'm' : 'xxs'}>
            <Text color="grey.500" type="paragraphExtraSmall">
              {children}
            </Text>
          </Space>
          <div className={styles.footer}>
            <Text color="grey.500" type="paragraphExtraSmall">
              {step} of {totalSteps}
            </Text>
            <div className={styles.cta}>
              {onSecondaryActionClick && (
                <button type="button" className={styles.secondaryAction} onClick={onSecondaryActionClick}>
                  <Text color="primary.400">{secondaryActionLabel}</Text>
                </button>
              )}
              <Button variant="secondary" size="s" onClick={onPrimaryActionClick}>
                {primaryActionLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
