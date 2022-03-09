import Cookies from 'js-cookie';
import { CircularProgress, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthLayer } from '~providers/auth';
import { AuthCookie } from '~types/auth';

const LoggingIn = () => {
  const router = useRouter();
  const { state, session } = useAuthLayer();

  useEffect(() => {
    if (
      state === 'LOGGED_IN' &&
      session &&
      session.user &&
      session.user.user_metadata
    ) {
      // Set cookie
      const {
        provider_token,
        user: {
          user_metadata: { provider_id },
        },
      } = session;

      if (!provider_token) return;

      const auth: AuthCookie = {
        provider_token,
        provider_id,
      };
      Cookies.set('auth', JSON.stringify(auth));
      // Replace to /
      router.replace('/');
    }
  }, [state, session, router]);

  return (
    <Flex w="full" h="100vh" justify="center" align="center">
      <CircularProgress isIndeterminate />
    </Flex>
  );
};

export default LoggingIn;
