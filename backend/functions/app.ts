import path from 'path';

import serverless from 'serverless-http';

import { getApp } from '../src/app';

const app = getApp(`/.netlify/functions/${path.parse(__filename).name}`);

export const handler = serverless(app);
