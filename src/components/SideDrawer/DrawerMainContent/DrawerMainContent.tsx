import { useTheme, Space, ColorKey } from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import React, { useMemo } from 'react';

import styles from './DrawerMainContent.module.scss';

type DrawerMainContentProps = {
  children: React.ReactNode;
  scrollbarColor?: ColorKey;
};

export const DrawerMainContent = ({ children, scrollbarColor = 'grey.600' }: DrawerMainContentProps) => {
  const { getColor } = useTheme();
  const drawerContentStyles = useMemo(() => {
    return `
    .drawerContent {
      scrollbar-color: ${getColor(scrollbarColor)};
      scrollbar-width: thin;
    }
    .drawerContent::-webkit-scrollbar {
      width: 8px;
      height: 100%;
    }
    .drawerContent::-webkit-scrollbar-thumb {
      background-color: ${getColor(scrollbarColor)};
      border-radius: 20px;
    }
    .drawerContent::-webkit-scrollbar-track {
      background-color: ${getColor('transparent')};
    }
  `;
  }, [scrollbarColor]);
  return (
    <>
      <style>{drawerContentStyles}</style>
      <Space testID="DrawerMainContent" pt="s" className={cx('drawerContent', styles.content)}>
        {children}
      </Space>
    </>
  );
};
