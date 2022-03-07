import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const theme = extendTheme(
  {},
  withDefaultColorScheme({
    colorScheme: 'purple',
    components: ['Button', 'Input', 'CircularProgress'],
  })
);

export default theme;
