import { SideDrawerContext } from '@src/context/SideDrawerContext';
import { useContext } from 'react';

const useDrawer = () => {
  const { isDrawerOpen, contentType, openDrawer, closeDrawer } = useContext(SideDrawerContext);

  return { isDrawerOpen, contentType, openDrawer, closeDrawer };
};

export default useDrawer;
