import { useCallback, useContext } from 'react';

import { DrawerContext } from '../context/DrawerContext';

const useDrawer = () => {
  const { isDrawerOpen, setIsDrawerOpen } = useContext(DrawerContext);

  const openDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return { isDrawerOpen, openDrawer, closeDrawer };
};

export default useDrawer;
