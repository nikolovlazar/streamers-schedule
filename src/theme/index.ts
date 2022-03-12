import {
  extendTheme,
  withDefaultColorScheme,
  theme as base,
} from '@chakra-ui/react';

const theme = extendTheme(
  {
    config: {
      initialColorMode: 'dark',
    },
    primary: {
      600: base.colors.gray[800],
      900: base.colors.gray[900],
    },
    green: {
      300: base.colors.green[300],
    },
    grey: {
      300: base.colors.gray[300],
    },
    white: '#FFFFFF',
    gradient: {
      blue: {
        300: base.colors.purple[600],
        600: base.colors.purple[600],
        900: base.colors.purple[600],
      },
    },
    loader: {
      bg: base.colors.gray[800],
      pink: base.colors.pink[500],
      purple: base.colors.purple[500],
      teal: base.colors.teal[500],
    },
    text: {
      grey: {
        300: base.colors.gray[300],
        500: base.colors.gray[500],
      },
    },
    scrollbar: {
      border: base.colors.gray[500],
      thumb: {
        bg: base.colors.gray[400],
      },
    },
    timeline: {
      divider: {
        bg: base.colors.gray[700],
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'purple',
    components: ['Button', 'Input', 'CircularProgress'],
  })
);

export default theme;
