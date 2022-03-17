import { Box, VStack } from '@chakra-ui/react';
import type { GetServerSideProps } from 'next';
import { ReactElement, useState } from 'react';

import Layout from 'layout';
import DayPicker from '~components/day-picker';
import Schedule from '~components/schedule';
import { getFollows, getUsersProfilePicture } from '~utils/twitch-api';
import type { AuthCookie } from '~types/auth';
import type { Streamer } from '~types/api';

type Props = {
  streamers: Streamer[];
};

const Home = ({ streamers }: Props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <Box w="full" flex={1} p={6} h="calc(100vh - 48px)">
      <VStack spacing={6} alignItems="flex-start" h="full">
        <DayPicker selectedDate={selectedDate} onChange={setSelectedDate} />
        <Box flex={1} overflow="hidden" w="full">
          <Schedule streamers={streamers} />
        </Box>
      </VStack>
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
Home.isProtected = true;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  if (!ctx.req.cookies['auth']) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const auth = JSON.parse(ctx.req.cookies['auth']) as AuthCookie;
  const startTime = ctx.query.start_time as string | undefined;

  const streamers: Streamer[] = [];
  const follows = await getFollows(auth);
  const followsIds = follows.map((follow) => follow.to_id);
  const profilePhotos = await getUsersProfilePicture(followsIds, auth.provider_token);

  follows.forEach(({ to_id, to_name }) => {
    const imageUrl = profilePhotos
      .filter(({ id }) => id === to_id)
      .map(({ profile_image_url }) => profile_image_url)[0];
    const streamer: Streamer = {
      id: to_id,
      name: to_name,
      profile_image_url: imageUrl,
      segments: []
    };

    streamers.push(streamer);
  });

  return {
    props: {
      streamers,
    },
  };
};

export default Home;
