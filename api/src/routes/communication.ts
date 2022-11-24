import { authentication, communications } from '@dolbyio/dolbyio-rest-apis-client';
import dotenv from 'dotenv';
import express from 'express';

import { processErrorStatus } from '../utils/utils';

const router = express.Router();
dotenv.config();

const { KEY, SECRET } = process.env;

router.post('/streaming/start', async ({ body }, res) => {
  const { conferenceId, rtmp } = body;
  if (!rtmp || !conferenceId) {
    return res.status(400).json({ error: 'Missing necessary parameters' });
  }
  try {
    const token = await authentication.getApiAccessToken(KEY!, SECRET!, 3600);
    await communications.streaming.startRtmp(token, conferenceId, rtmp);
    return res.status(204).send('OK');
  } catch (e: any) {
    const { status, message } = processErrorStatus(e);
    return res.status(status).send(message);
  }
});

router.post('/streaming/stop', async ({ body }, res) => {
  const { conferenceId } = body;

  if (!conferenceId) {
    return res.status(400).json({ error: 'Missing conference id param.' });
  }
  try {
    const token = await authentication.getApiAccessToken(KEY!, SECRET!, 3600);
    await communications.streaming.stopRtmp(token, conferenceId);
    return res.status(204).send('OK');
  } catch (e: any) {
    console.log(e);
    const { status, message } = processErrorStatus(e);
    return res.status(status).send(message);
  }
});

export default router;
