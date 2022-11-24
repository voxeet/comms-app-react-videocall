import { communications } from '@dolbyio/dolbyio-rest-apis-client';
import dotenv from 'dotenv';
import express from 'express';

const router = express.Router();
dotenv.config();

const { KEY, SECRET } = process.env;

router.post('/conference/access_token', async (req, res) => {
  try {
    const token = await communications.authentication.getClientAccessToken(KEY!, SECRET!, 3600);
    return res.status(200).send({ data: token });
  } catch (e) {
    return res.status(500).send(e);
  }
});

export default router;
