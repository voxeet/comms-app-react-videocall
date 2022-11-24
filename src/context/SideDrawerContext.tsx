import React, { useState, createContext, useMemo } from 'react';

type SideDrawerContext = {
  isDrawerOpen: boolean;
  contentType: SideDrawerContentTypes | null;
  openDrawer: (contentType: SideDrawerContentTypes) => void;
  closeDrawer: () => void;
};

export enum SideDrawerContentTypes {
  DEVICE_SETUP,
  PARTICIPANTS,
  CONFERENCE_SETTINGS,
}

type AppProviderProps = { children: React.ReactNode };

export const SideDrawerContext = createContext<SideDrawerContext>({} as SideDrawerContext);

export const SideDrawerProvider = ({ children }: AppProviderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [contentType, setContentType] = useState<SideDrawerContext['contentType']>(null);

  const openDrawer = (contentType: SideDrawerContentTypes) => {
    setIsDrawerOpen(true);
    setContentType(contentType);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setContentType(null);
  };

  const contextValue: SideDrawerContext = useMemo(
    () => ({
      isDrawerOpen,
      contentType,
      openDrawer,
      closeDrawer,
    }),
    [isDrawerOpen, contentType],
  );

  return <SideDrawerContext.Provider value={contextValue}>{children}</SideDrawerContext.Provider>;
};
