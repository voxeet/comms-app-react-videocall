import { env } from './env';

const getProxyUrl = () => env('VITE_API_PROXY_URL');
export default getProxyUrl;
