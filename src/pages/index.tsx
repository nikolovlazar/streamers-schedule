import { Box, List, ListItem, VStack } from '@chakra-ui/react';
import Layout from 'layout';
import { GetServerSideProps } from 'next';
import { ReactElement, useState } from 'react';

import DayPicker from '~components/day-picker';
import Schedule from '~components/schedule';
import { FollowRelationship } from '~types/api';
import { AuthCookie } from '~types/auth';
import { getFollows } from '~utils/twitch-api';

type Props = {
  follows: FollowRelationship[];
};

const Home = ({ follows }: Props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <Box w="full" flex={1}>
      <VStack spacing={6} alignItems="flex-start" h="full" px={6}>
        <DayPicker selectedDate={selectedDate} onChange={setSelectedDate} />
        <Schedule />
      </VStack>
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
Home.isProtected = true;

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  if (!ctx.req.cookies['auth']) {
    return {
      redirect: '/login',
      props: { follows: [] },
    };
  }
  const auth = JSON.parse(ctx.req.cookies['auth']) as AuthCookie;

  const follows = await getFollows(auth);

  return {
    props: {
      follows,
    },
  };
};

export default Home;
