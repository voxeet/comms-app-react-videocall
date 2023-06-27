import getProxyUrl from '@src/utils/getProxyUrl';
import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import fetch from '../utils/fetch';

const useToken = () => {
  const location = useLocation();

  const accessToken = useMemo(() => {
    return encodeURIComponent(
      new URLSearchParams(window.location.search).get('token') || import.meta.env.VITE_CLIENT_ACCESS_TOKEN || '',
    );
  }, [location]);

  const [YOUR_TOKEN, setToken] = useState<string | null>(null);

  const getToken = async () => {
    if (accessToken && accessToken.length) {
      return accessToken;
    }
    const res = await fetch(`${getProxyUrl()}/client-access-token`, { method: 'GET' });
    return res.data.access_token;
  };

  useEffect(() => {
    (async () => {
      setToken(await getToken());
    })();
  }, []);

  return { YOUR_TOKEN, getToken };
};

export default useToken;
