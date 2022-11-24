import fs from 'fs';
import https from 'https';
import path from 'path';

import * as bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import auth from './routes/auth';
import comm from './routes/communication';

dotenv.config();
/*
 APP_KEY, and APP_SECRET should be on pair with example application values since we are working on current conference bounded with those values
 */
const { PORT, HOSTNAME, SSL, KEY, SECRET } = process.env;

if (!KEY || !SECRET) {
  throw new Error('KEY and SECRET variables are mandatory');
}

const app = express();

// eslint-disable-next-line new-cap
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(auth);
app.use(comm);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
let server = null;

if (SSL === 'true') {
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '..', 'certs', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'certs', 'cert.pem')),
  };
  server = https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Listening at https://${HOSTNAME}:${PORT}/`);
  });
  server.on('error handler', console.error);
} else {
  server = app.listen(PORT, () => {
    console.log(`Listening at http://${HOSTNAME}:${PORT}/`);
  });
  server.on('error handler', console.error);
}

process.on('SIGTERM', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  server.close(() => {
    console.log('Http server closed.');
  });
});
