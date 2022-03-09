import { Heading, List, ListItem, VStack } from '@chakra-ui/react';
import Layout from 'layout';
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';

import { useAuth } from '~providers/auth';
import { FollowRelationship } from '~types/api';
import { AuthCookie } from '~types/auth';
import { getFollows } from '~utils/twitch-api';

type Props = {
  follows: FollowRelationship[];
};

const Home = ({ follows }: Props) => {
  const { session } = useAuth();

  return (
    <VStack spacing={12}>
      <Heading>Welcome, {session?.user?.email}</Heading>
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
  const auth = JSON.parse(ctx.req.cookies['auth']) as AuthCookie;

  const follows = await getFollows(auth);

  return {
    props: {
      follows,
    },
  };
};

export default Home;
