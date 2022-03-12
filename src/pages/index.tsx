import { List, ListItem, VStack } from '@chakra-ui/react';
import Layout from 'layout';
import { GetServerSideProps } from 'next';
import { ReactElement, useState } from 'react';

import DayPicker from '~components/day-picker';
import { FollowRelationship } from '~types/api';
import { AuthCookie } from '~types/auth';
import { getFollows } from '~utils/twitch-api';

type Props = {
  follows: FollowRelationship[];
};

const Home = ({ follows }: Props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <VStack spacing={6} alignItems="flex-start" w="full" px={6}>
      <DayPicker selectedDate={selectedDate} onChange={setSelectedDate} />
      <List>
        {follows.map(({ to_name }) => (
          <ListItem key={to_name}>{to_name}</ListItem>
        ))}
      </List>
    </VStack>
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
