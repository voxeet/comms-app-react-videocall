import { getApp } from './app';
import { env } from './utils/env';

const PORT = env('PORT');
const app = getApp('');

const server = app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});

server.on('error handler', console.error);

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Http server closed.');
  });
});
