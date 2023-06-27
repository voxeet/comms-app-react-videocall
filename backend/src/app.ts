import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { getAuthRoutes } from './routes/auth';
import { getCommunicationRoutes } from './routes/communication';
import { getEventRoutes } from './routes/event';
import { getPubNubRoutes } from './routes/pubnub';
import { env } from './utils/env';

export function getApp(basePath: string) {
  const KEY = env('KEY');
  const SECRET = env('SECRET');
  const PUBNUB_SUBSCRIBE_KEY = env('PUBNUB_SUBSCRIBE_KEY');
  const PUBNUB_PUBLISH_KEY = env('PUBNUB_PUBLISH_KEY');
  const PUBNUB_SECRET_KEY = env('PUBNUB_SECRET_KEY');

  if (!KEY || !SECRET) {
    throw new Error('KEY and SECRET environment variables are mandatory');
  }

  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(
    basePath,
    getAuthRoutes({
      commsKey: KEY,
      commsSecret: SECRET,
    }),
  );
  app.use(
    basePath,
    getCommunicationRoutes({
      commsKey: KEY,
      commsSecret: SECRET,
    }),
  );
  app.use(
    basePath,
    getEventRoutes({
      commsKey: KEY,
      commsSecret: SECRET,
    }),
  );

  if (PUBNUB_PUBLISH_KEY && PUBNUB_SUBSCRIBE_KEY && PUBNUB_SECRET_KEY) {
    app.use(
      basePath,
      getPubNubRoutes({
        pubNubPublishKey: PUBNUB_PUBLISH_KEY,
        pubNubSubscribeKey: PUBNUB_SUBSCRIBE_KEY,
        pubNubSecretKey: PUBNUB_SECRET_KEY,
      }),
    );
  }

  return app;
}
