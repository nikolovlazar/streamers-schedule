import { Heading } from '@chakra-ui/react';
import Layout from 'layout';
import { ReactElement } from 'react';

import { useAuth } from '~providers/auth';

const Home = () => {
  const { session } = useAuth();

  return <Heading>Welcome, {session?.user?.email}</Heading>;
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
Home.isProtected = true;

export default Home;
