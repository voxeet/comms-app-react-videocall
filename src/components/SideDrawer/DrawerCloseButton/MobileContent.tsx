import { IconButton, IconButtonProps } from '@dolbyio/comms-uikit-react';
import useDrawer from '@hooks/useDrawer';
import React from 'react';

type MobileContentProps = Partial<IconButtonProps>;

const MobileContent = ({ ...rest }: MobileContentProps) => {
  const { closeDrawer } = useDrawer();
  return (
    <IconButton
      icon="close"
      onClick={closeDrawer}
      backgroundColor="transparent"
      size="s"
      testID="DrawerCloseButton"
      {...rest}
    />
  );
};

export default MobileContent;
