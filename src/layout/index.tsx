import { VStack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import Navbar from './navbar';

type Props = PropsWithChildren<{}>;

const Layout = ({ children }: Props) => (
  <VStack spacing={6}>
    <Navbar />
    {children}
  </VStack>
);

export default Layout;
