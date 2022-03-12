import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const theme = extendTheme(
  {
    config: {
      initialColorMode: 'dark',
    },
  },
  withDefaultColorScheme({
    colorScheme: 'purple',
    components: ['Button', 'Input', 'CircularProgress'],
  })
);

export default theme;
