import React, { useState, createContext, useMemo, Dispatch, SetStateAction } from 'react';

type DrawerContext = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

type AppProviderProps = { children: React.ReactNode };

export const DrawerContext = createContext<DrawerContext>({} as DrawerContext);

export const DrawerProvider = ({ children }: AppProviderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const contextValue: DrawerContext = useMemo(
    () => ({
      isDrawerOpen,
      setIsDrawerOpen,
    }),
    [isDrawerOpen],
  );

  return <DrawerContext.Provider value={contextValue}>{children}</DrawerContext.Provider>;
};
