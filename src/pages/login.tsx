import { Button, Flex } from '@chakra-ui/react';

import supabase from '../supabase';

const Login = () => {
  const handleLogin = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'twitch',
    });

    console.log('User', user);
    console.log('Session', session);
    console.log('Error', error);
  };

  return (
    <Flex justify="center" alignItems="center" h="100vh">
      <Button colorScheme="purple" onClick={handleLogin}>
        Login with Twitch
      </Button>
    </Flex>
  );
};

export default Login;
