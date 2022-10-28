import { IconButton, IconButtonProps } from '@dolbyio/comms-uikit-react';
import React from 'react';

type MobileContentProps = {
  close: () => void;
} & Partial<IconButtonProps>;

const MobileContent = ({ close, ...rest }: MobileContentProps) => {
  return (
    <IconButton
      {...rest}
      icon="close"
      onClick={close}
      backgroundColor="transparent"
      size="s"
      testID="DrawerCloseButton"
    />
  );
};

export default MobileContent;
