import { Text } from '@dolbyio/comms-uikit-react';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';

type TimerProps = {
  startTime?: number;
};

const Timer = ({ startTime }: TimerProps) => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useLayoutEffect(() => {
    if (startTime) {
      const secondsPassed = Math.ceil((Date.now() - startTime) / 1000);
      setHours(Math.trunc(secondsPassed / 3600));
      setMinutes(Math.trunc((secondsPassed % 3600) / 60));
      setSeconds(secondsPassed % 60);
    }
  }, [startTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const secondsDisplayValue = useMemo(() => {
    let value: number | string = seconds;

    if (seconds < 10) {
      value = `0${seconds}`;
    }

    if (seconds === 60) {
      setMinutes((prev) => prev + 1);
      setSeconds(0);
    }

    return value;
  }, [seconds]);

  const minutesDisplayValue = useMemo(() => {
    let value = `${minutes}:`;

    if (minutes < 10) {
      value = `0${minutes}:`;
    }

    if (minutes === 60) {
      setHours((prev) => prev + 1);
      setMinutes(0);
    }

    return value;
  }, [minutes]);

  const hoursDisplayValue = useMemo(() => {
    let value: string | null = `${hours}:`;

    if (hours < 1) {
      value = null;
    } else if (hours < 10) {
      value = `0${hours}:`;
    }

    return value;
  }, [hours]);

  return (
    <>
      <Text>{hoursDisplayValue}</Text>
      <Text>{minutesDisplayValue}</Text>
      <Text>{secondsDisplayValue}</Text>
    </>
  );
};

export default Timer;
