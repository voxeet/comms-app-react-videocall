import { Space, Tooltip, useTheme } from '@dolbyio/comms-uikit-react';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import './RangeInput.module.scss';

type RangeInputProps = {
  minValue: number;
  maxValue: number;
  step?: number;
  value: number;
  callback: (value: number) => void;
} & React.ComponentProps<typeof Space>;

export const RangeInput = ({ minValue, maxValue, step = 1, value, callback }: RangeInputProps) => {
  const [sliderValue, setSliderValue] = useState(value || minValue);
  const { getColor } = useTheme();
  const ref = React.useRef<HTMLInputElement | null>(null);
  const [stepRange, setStep] = React.useState(minValue);

  useEffect(() => {
    callback(sliderValue);
  }, [sliderValue]);

  useLayoutEffect(() => {
    document.documentElement.style.setProperty('--primary', getColor('purple.400'));
    document.documentElement.style.setProperty('--neutral', getColor('grey.300'));
  }, []);

  React.useEffect(() => {
    if (ref.current) {
      const { offsetWidth, max } = ref.current;
      const calcStep = offsetWidth / +max;
      setStep(calcStep);
    }
  }, []);

  const getOffset =
    -(Math.ceil(maxValue / 2) - sliderValue) * stepRange - ((Math.ceil(maxValue / 2) - sliderValue) / maxValue) * 12;

  return (
    <Space fw>
      <Tooltip
        position="top"
        text={sliderValue.toString()}
        style={{ width: '100%' }}
        tooltipStyle={{
          transform: `translateX(${getOffset}px)`,
        }}
      >
        <input
          onChange={(event) => setSliderValue(+event.target.value)}
          type="range"
          id="range"
          min={minValue}
          max={maxValue}
          value={sliderValue}
          step={step}
          ref={ref}
        />
      </Tooltip>
    </Space>
  );
};
