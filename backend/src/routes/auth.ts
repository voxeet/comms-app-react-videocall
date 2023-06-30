import { communications } from '@dolbyio/dolbyio-rest-apis-client';
import { Router } from 'express';

export function getAuthRoutes(params: { commsKey: string; commsSecret: string }) {
  const router = Router();

  router.get('/client-access-token', async (req, res) => {
    try {
      const token = await communications.authentication.getClientAccessToken(params.commsKey, params.commsSecret, 3600);
      return res.status(200).send({ access_token: token.access_token });
    } catch (e) {
      return res.status(500).send(e);
    }
  });

  return router;
}
