import { useLogger } from '@dolbyio/comms-uikit-react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useToken = () => {
  const location = useLocation();
  const { log } = useLogger();

  const YOUR_TOKEN = useMemo(() => {
    return encodeURIComponent(
      new URLSearchParams(window.location.search).get('token') || import.meta.env.VITE_CLIENT_ACCESS_TOKEN || '',
    );
  }, [location]);

  const getToken = () => {
    log(
      2,
      'Token refreshing is currently not provided by the demo app, we strongly recommend you implement this yourself',
    );
    return Promise.resolve(YOUR_TOKEN);
  };

  return { YOUR_TOKEN, getToken };
};

export default useToken;
