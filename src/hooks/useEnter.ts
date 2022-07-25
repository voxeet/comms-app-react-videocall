import { useEffect } from 'react';

export const useEnter = (action: () => void, deps?: unknown) => {
  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEnter);
    return () => document.removeEventListener('keydown', handleEnter);
  }, [deps]);
};
