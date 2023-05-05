const { VITE_PROXY_PROTOCOL, VITE_API_PROXY, VITE_PROXY_PORT } = import.meta.env;

const getProxyUrl = () => `${VITE_PROXY_PROTOCOL}://${VITE_API_PROXY}${VITE_PROXY_PORT ? `:${VITE_PROXY_PORT}` : ''}`;

export default getProxyUrl;
