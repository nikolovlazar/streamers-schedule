import {
  FollowRelationship,
  FollowsResult,
  ScheduleResult,
  Segment,
} from '~types/api';
import { AuthCookie } from '~types/auth';
import { fetchData } from './api';
import { getFollowsUrl, getScheduleUrl, getUsersUrl } from './urls';

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

      const res = await fetchData(url, provider_token);

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

export const getUsersProfilePicture = async (
  ids: string[],
  provider_token: string
): Promise<{ id: string; profile_image_url: string }[]> =>
  new Promise(async (resolve, reject) => {
    const data: {
      id: string;
      profile_image_url: string;
    }[] = [];

    // TODO: manually chunk the ids in groups of 100 (at most)
    const url = getUsersUrl(ids);

    const res = await fetchData(url, provider_token);

    if (!res.ok) {
      reject(res.statusText);
    }

    const profilesRes = (await res.json()) as {
      data: {
        id: string;
        profile_image_url: string;
      }[];
    };

    data.push(...profilesRes.data);

    resolve(data);
  });

export const getSchedule = (
  broadcaster_id: string,
  provider_token: string,
  startTime?: string
): Promise<Segment[]> =>
  new Promise((resolve, reject) => {
    const segments: Segment[] = [];

    const fetchSegmentsPaginated = async (cursor?: string) => {
      let url = getScheduleUrl(broadcaster_id, startTime);
      if (cursor) {
        url = `${url}&after=${cursor}`;
      }

      const res = await fetchData(url, provider_token);

      if (!res.ok) {
        reject(res.statusText);
      }

      const scheduleRes = (await res.json()) as ScheduleResult;
      const {
        pagination: { cursor: nextCursor },
        data: { segments: pageSegments },
      } = scheduleRes;
      segments.push(...pageSegments);

      if (nextCursor) {
        fetchSegmentsPaginated(nextCursor);
      } else {
        resolve(segments);
      }
    };

    fetchSegmentsPaginated();
  });
