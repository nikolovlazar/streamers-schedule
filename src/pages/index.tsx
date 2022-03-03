import { CircularProgress, Flex, Heading } from '@chakra-ui/react';
import type { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import supabase from '../supabase';

const Home = () => {
  const [session, setSession] = useState<Session>();
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const userSession = supabase.auth.session();

      if (!userSession) {
        const { data: urlSession, error } =
          await supabase.auth.getSessionFromUrl({
            storeSession: true,
          });

        debugger;

        if (!urlSession || error) {
          router.replace('/login');
        } else {
          supabase.auth.setSession(urlSession.refresh_token ?? '');
          setSession(urlSession);
        }
      } else {
        setSession(userSession);
      }
    };

    getSession();
  }, [router]);

  if (!session) {
    return (
      <Flex justify="center" alignItems="center" h="100vh">
        <CircularProgress isIndeterminate />
      </Flex>
    );
  }

  return <Heading>Welcome, {session?.user?.email}</Heading>;
};

export default Home;
