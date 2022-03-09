import { FollowRelationship, FollowsResult } from '~types/api';
import { AuthCookie } from '~types/auth';
import { getFollowsUrl } from './urls';

export const getFollows = ({
  provider_id,
  provider_token,
}: AuthCookie): Promise<FollowRelationship[]> =>
  new Promise((resolve, reject) => {
    const follows: FollowRelationship[] = [];

    const fetchFollowsPaginatinated = async (cursor?: string) => {
      let url = getFollowsUrl(provider_id);
      if (cursor) {
        url = `${url}&after=${cursor}`;
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${provider_token}`,
          'Client-Id': process.env.TWITCH_CLIENT_ID ?? '',
        },
      });

      if (!res.ok) {
        reject(res.statusText);
      }

      const followRes = (await res.json()) as FollowsResult;
      const {
        pagination: { cursor: nextCursor },
        data: pageFollows,
      } = followRes;
      follows.push(...pageFollows);

      if (nextCursor) {
        fetchFollowsPaginatinated(nextCursor);
      } else {
        resolve(follows);
      }
    };

    fetchFollowsPaginatinated();
  });
