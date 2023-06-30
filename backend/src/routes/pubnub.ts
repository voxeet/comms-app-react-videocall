import { Router } from 'express';
import PubNub from 'pubnub';

const TOKEN_TTL_MINUTES = 15;

export function getPubNubRoutes({
  pubNubPublishKey,
  pubNubSubscribeKey,
  pubNubSecretKey,
}: {
  pubNubPublishKey: string;
  pubNubSubscribeKey: string;
  pubNubSecretKey: string;
}) {
  const router = Router();
  const pubnub = new PubNub({
    subscribeKey: pubNubSubscribeKey,
    publishKey: pubNubPublishKey,
    secretKey: pubNubSecretKey,
    userId: 'api-proxy',
  });

  router.post('/pubnub/token', async (req, res) => {
    try {
      const params = {
        conferenceId: req.body.conferenceId,
        userId: req.body.userId,
        username: req.body.username,
        role: req.body.role,
      } as const;

      const missing: string[] = [];
      for (const [key, value] of Object.entries(params)) {
        if (!value) {
          missing.push(key);
        }
      }

      if (missing.length > 0) {
        return res.status(400).json({ error: `Missing parameters: ${missing.join(', ')}` });
      }

      // Store this user's metadata in PubNub so that other users can retrieve it later
      await pubnub.objects.setUUIDMetadata({
        uuid: params.userId,
        data: {
          name: params.username,
          custom: {
            role: params.role,
          },
        },
      });

      const channels: Record<string, PubNub.GrantTokenPermissions> = {
        // Channel where hosts and viewers can send chat messages
        [params.conferenceId]: {
          read: true,
          write: true,
          delete: params.role === 'host',
        },
        // Allow user to subscribe to presence events
        [`${params.conferenceId}-pnpres`]: {
          read: true,
        },
      };

      const patterns: PubNub.GrantTokenParameters['patterns'] = {
        uuids: {
          // Allow user to access metadata for all other users
          '.*': {
            get: true,
          },
        },
      };

      // Give viewer access to a channel unique to the viewer.
      // Hosts will be able to use this channel to send invites to the viewer.
      if (params.role === 'viewer') {
        channels[`${params.userId}.viewer`] = {
          read: true,
          write: true,
        };
      } else if (params.role === 'host') {
        patterns.channels = {};
        patterns.channels['.*.viewer'] = {
          read: true,
          write: true,
        };
      }

      const token = await pubnub.grantToken({
        authorized_uuid: params.userId,
        ttl: TOKEN_TTL_MINUTES,
        resources: { channels },
        patterns,
      });

      return res.status(200).send({
        token,
        subscribeKey: pubNubSubscribeKey,
        publishKey: pubNubPublishKey,
      });
    } catch (e) {
      return res.status(500).send(e);
    }
  });

  return router;
}
