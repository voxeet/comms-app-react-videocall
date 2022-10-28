import { InfoBar, useTheme } from '@dolbyio/comms-uikit-react';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const PendingTakeoverInfoBar = () => {
  const [dots, setDots] = useState<string[]>([]);
  const intl = useIntl();
  const { getColor } = useTheme();

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      if (dots.length < 3) {
        setDots((prev) => [...prev, '.']);
      } else {
        setDots([]);
      }
    }, 500);

    return () => {
      clearInterval(dotsInterval);
    };
  }, [dots]);

  return (
    <InfoBar
      style={{ backgroundColor: getColor('grey.900') }}
      iconName="present"
      alwaysVisible
      text={`${intl.formatMessage({ id: 'pendingTakeoverRequest' })} ${dots.join('')}`}
    />
  );
};

export default PendingTakeoverInfoBar;
