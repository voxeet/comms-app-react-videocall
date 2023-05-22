import { DependencyList, useEffect } from 'react';

export const usePageRefresh = (cleanup: (e: BeforeUnloadEvent) => void, deps?: DependencyList) => {
  useEffect(() => {
    window.addEventListener('beforeunload', cleanup);
    return () => {
      window.removeEventListener('beforeunload', cleanup);
    };
  }, deps);
};
