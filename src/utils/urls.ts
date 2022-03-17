export const getFollowsUrl = (from_id: string) =>
  `https://api.twitch.tv/helix/users/follows?from_id=${from_id}`;
export const getScheduleUrl = (broadcaster_id: string, startTime?: string) =>
  `https://api.twitch.tv/helix/schedule?broadcaster_id=${broadcaster_id}${
    startTime ? `&start_time=${startTime}` : ''
  }`;
export const getUsersUrl = (id: string | string[]) => {
  let base = 'https://api.twitch.tv/helix/users';

  if (Array.isArray(id)) {
    base = `${base}?id=${id.join('&id=')}`;
  } else if (typeof id === 'string') {
    base = `${base}?id=${id}`;
  }

  return base;
};
