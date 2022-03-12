import { useEpg, Epg, Layout, type Theme } from 'planby';

import { epg } from './epg';
import { channels } from './channels';
import { Box } from '@chakra-ui/react';

const Schedule = () => {
  const {
    getEpgProps,
    getLayoutProps,
    onScrollToNow,
    onScrollLeft,
    onScrollRight,
  } = useEpg({
    epg,
    channels,
    startDate: "2022/02/18",
  });

  return (
    <Box overflow="hidden" width="full" flex={1}>
      <Box as={Epg} h="full" {...getEpgProps()}>
        <Layout {...getLayoutProps()} />
      </Box>
    </Box>
  );
};

export default Schedule;
