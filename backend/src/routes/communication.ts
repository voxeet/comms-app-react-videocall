import { authentication, communications } from '@dolbyio/dolbyio-rest-apis-client';
import { Router } from 'express';

import { processErrorStatus } from '../utils/errors';

export function getCommunicationRoutes(params: { commsKey: string; commsSecret: string }) {
  const router = Router();

  router.post('/stream/rtmp/start', async ({ body }, res) => {
    const { conferenceId, rtmpUrl } = body;
    if (!rtmpUrl || !conferenceId) {
      return res.status(400).json({ error: 'Missing necessary parameters' });
    }
    try {
      const token = await authentication.getApiAccessToken(params.commsKey, params.commsSecret, 3600);
      await communications.streaming.startRtmp(token, conferenceId, rtmpUrl);
      return res.status(204).send('OK');
    } catch (e) {
      const { status, message } = processErrorStatus(e);
      return res.status(status).send(message);
    }
  });

  router.post('/stream/rtmp/stop', async ({ body, query }, res) => {
    res.status(200);
    let conferenceId;
    if ('conferenceId' in body) conferenceId = body.conferenceId;
    if ('conferenceId' in query) conferenceId = query.conferenceId;

    if (!conferenceId) {
      return res.status(400).json({ error: 'Missing conference id param.' });
    }
    try {
      const token = await authentication.getApiAccessToken(params.commsKey, params.commsSecret, 3600);
      await communications.streaming.stopRtmp(token, conferenceId);
      return res.status(204).send('OK');
    } catch (e) {
      console.log(e);
      const { status, message } = processErrorStatus(e);
      return res.status(status).send(message);
    }
  });

  return router;
}
