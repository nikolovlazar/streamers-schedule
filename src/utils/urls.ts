export const getFollowsUrl = (from_id: string) =>
  `https://api.twitch.tv/helix/users/follows?from_id=${from_id}`;
