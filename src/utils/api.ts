export const fetchData = (url: string, provider_token: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${provider_token}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID ?? '',
    },
  });
