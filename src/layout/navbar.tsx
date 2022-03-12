import {
  Avatar,
  Button,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

import { useUser } from '~hooks/use-user';
import { useAuth } from '~providers/auth';

const Navbar = () => {
  const user = useUser();
  const { logout } = useAuth();
  return (
    <HStack justify="space-between" py={2} bg="gray.700" w="full" px={6}>
      <Heading size="md">StreamersSchedule</Heading>
      <Menu>
        <MenuButton
          as={Button}
          variant="unstyled"
          size="sm"
          rounded="full"
          p={0}
        >
          <Avatar
            size="sm"
            name={user?.user_metadata?.name}
            src={user?.user_metadata?.avatar_url}
          />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={logout}>Log out</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default Navbar;
