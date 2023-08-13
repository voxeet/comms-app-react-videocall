import getProxyUrl from '@src/utils/getProxyUrl';
import { useState, useEffect, useCallback } from 'react';

import fetch from '../utils/fetch';

const useToken = () => {
  const [error, setError] = useState<string | undefined>();

  const urlParams = new URLSearchParams(window.location.search);
  const urlAccessToken = urlParams.get('token');

  const accessToken = import.meta.env.VITE_CLIENT_ACCESS_TOKEN || urlAccessToken || '';

  const [YOUR_TOKEN, setToken] = useState<string | null>(null);

  const getToken = useCallback(async () => {
    if (accessToken && accessToken.length) {
      return accessToken;
    }
    try {
      const res = await fetch(`${getProxyUrl()}/client-access-token`);

      if (!res.data.access_token) {
        setError(`Invalid Dolby.io token, please refer to Readme to set it correctly`);
      } else {
        setError(undefined);
      }
      return res.data.access_token;
    } catch (e) {
      setError(`Invalid Dolby.io token, please refer to Readme to set it correctly`);
      return null;
    }
  }, [accessToken]);

  useEffect(() => {
    (async () => {
      setToken(await getToken());
    })();
  }, [getToken]);

  return { YOUR_TOKEN, getToken, error };
};

export default useToken;
