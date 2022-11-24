import { useTheme, Space, Overlay } from '@dolbyio/comms-uikit-react';
import useDrawer from '@hooks/useDrawer';
import ConferenceDeviceSettings from '@src/components/SideDrawer/ContentTypes/ConferenceDeviceSettings/ConferenceDeviceSettings';
import DeviceSetup from '@src/components/SideDrawer/ContentTypes/DeviceSetup/DeviceSetup';
import Participants from '@src/components/SideDrawer/ContentTypes/Participants/Participants';
import { SideDrawerContentTypes } from '@src/context/SideDrawerContext';
import cx from 'classnames';
import React, { useMemo } from 'react';

import styles from './SideDrawer.module.scss';

const isSafariMobile = navigator.userAgent.match(/safari/i) && !('chrome' in window);

export const SideDrawer = () => {
  const { getColor, isMobile, isMobileSmall, isDesktop } = useTheme();
  const { isDrawerOpen, contentType, closeDrawer } = useDrawer();

  const isSmartphone = isMobile || isMobileSmall;
  const isSafariTablet = isSafariMobile && !isSmartphone;
  const isVisible = isDrawerOpen && contentType !== null;

  const backdrop = useMemo(() => {
    if (
      ((contentType === SideDrawerContentTypes.PARTICIPANTS ||
        contentType === SideDrawerContentTypes.CONFERENCE_SETTINGS) &&
        !isDesktop) ||
      contentType === SideDrawerContentTypes.DEVICE_SETUP
    ) {
      return true;
    }
    return false;
  }, [contentType, isDrawerOpen]);

  const background = useMemo(() => {
    if (
      contentType === SideDrawerContentTypes.PARTICIPANTS ||
      contentType === SideDrawerContentTypes.CONFERENCE_SETTINGS
    ) {
      return 'grey.800';
    }
    if (contentType === SideDrawerContentTypes.DEVICE_SETUP) {
      return 'white';
    }
    return 'grey.800';
  }, [contentType, isDrawerOpen]);

  const content = useMemo(() => {
    if (contentType === SideDrawerContentTypes.DEVICE_SETUP) {
      return <DeviceSetup />;
    }
    if (contentType === SideDrawerContentTypes.PARTICIPANTS) {
      return <Participants />;
    }
    if (contentType === SideDrawerContentTypes.CONFERENCE_SETTINGS) {
      return <ConferenceDeviceSettings />;
    }
    return null;
  }, [contentType, isDrawerOpen]);

  const drawerWrapper = useMemo(
    () => (
      <Space
        fw={isSmartphone}
        fh
        testID="Drawer"
        className={cx(styles.drawer, isSmartphone && styles.mobile, isVisible && styles.active)}
        style={{ backgroundColor: getColor(background, 'grey.800') }}
      >
        <Space fw fh className={styles.container}>
          {isVisible && content}
        </Space>
      </Space>
    ),
    [isSmartphone, isDrawerOpen, contentType],
  );

  return (
    <>
      <Overlay visible={backdrop && isVisible} onClick={closeDrawer} opacity={0.24} />
      {(!isSafariTablet || isVisible) && drawerWrapper}
    </>
  );
};

export default SideDrawer;
