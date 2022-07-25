import { useTheme, Space } from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import React from 'react';

import styles from './DrawerContent.module.scss';

type DrawerContentProps = {
  children: React.ReactNode;
};

export const DrawerContent = ({ children }: DrawerContentProps) => {
  const { getColor } = useTheme();
  const drawerContentStyles = `
  .drawerContent {
    scrollbar-color: ${getColor('grey.600')};
    scrollbar-width: thin;
  }
  .drawerContent::-webkit-scrollbar {
    width: 8px;
    height: 100%;
  }
  .drawerContent::-webkit-scrollbar-thumb {
    background-color: ${getColor('grey.600')};
    border-radius: 20px;
  }
  .drawerContent::-webkit-scrollbar-track {
    background-color: ${getColor('transparent')};
  }
`;
  return (
    <>
      <style>{drawerContentStyles}</style>
      <Space testID="DrawerContent" pt="s" className={cx('drawerContent', styles.content)}>
        {children}
      </Space>
    </>
  );
};
