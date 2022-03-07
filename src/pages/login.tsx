import { Button, Flex } from '@chakra-ui/react';
import { useAuth } from '~providers/auth';

const Login = () => {
  const { signInWithTwitch } = useAuth();

  return (
    <Flex justify="center" alignItems="center" h="100vh">
      <Button onClick={signInWithTwitch}>Login with Twitch</Button>
    </Flex>
  );
};

export default Login;
