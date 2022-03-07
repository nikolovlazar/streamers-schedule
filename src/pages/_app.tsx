import { ReactElement, ReactNode, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ChakraProvider, CircularProgress, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { AuthProvider, useAuthLayer } from '~providers/auth';
import theme from '~theme';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  isProtected?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const isProtected = Component.isProtected ?? false;
  const { state } = useAuthLayer();

  const [enhancedPage, setEnhancedPage] = useState<ReactNode>();

  useEffect(() => {
    const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

    if (isProtected) {
      switch (state) {
        case 'CHECKING':
          setEnhancedPage(
            <Flex w="full" h="100vh" justify="center" align="center">
              <CircularProgress isIndeterminate />
            </Flex>
          );
          break;
        case 'LOGGED_IN':
          setEnhancedPage(getLayout(<Component {...pageProps} />));
          break;
        case 'LOGGED_OUT':
        default:
          router.replace('/login');
          break;
      }
    } else {
      setEnhancedPage(getLayout(<Component {...pageProps} />));
    }
  }, [state, setEnhancedPage, Component, pageProps, isProtected, router]);

  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>{enhancedPage}</ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
