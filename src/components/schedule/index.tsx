import { useEpg, Epg, Layout } from 'planby';
import { Box, Text, Tooltip, VStack } from '@chakra-ui/react';
import { Channel, ChannelBox } from 'planby';

import { Streamer } from '~types/api';
import Image from '~components/image';
import theme from '~theme';

type Props = {
  streamers: Streamer[];
};

const Schedule = ({ streamers }: Props) => {
  const {
    getEpgProps,
    getLayoutProps,
    onScrollToNow,
    onScrollLeft,
    onScrollRight,
  } = useEpg({
    epg: [],
    channels: streamers.map(
      ({ id, name, profile_image_url }, index) =>
        ({
          uuid: id,
          logo: profile_image_url,
          title: name,
          position: {
            top: index,
          },
          type: 'channel',
        } as Channel)
    ),
    startDate: new Date(),
  });

  return (
    <Epg {...getEpgProps()}>
      <Layout
        {...getLayoutProps()}
        renderChannel={({ channel }) => (
          <ChannelBox key={channel.uuid} top={channel.position.top}>
            <VStack w="full" h="full" px={4}>
              <Tooltip label={channel['title']}>
                <Box
                  rounded="full"
                  overflow="hidden"
                  w={16}
                  h={16}
                  position="relative"
                >
                  <Image
                    src={channel.logo}
                    alt={channel['title']}
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
              </Tooltip>
              {/* <Text mt={0} fontSize="xs">
                {channel['title']}
              </Text> */}
            </VStack>
          </ChannelBox>
        )}
      />
    </Epg>
  );
};

export default Schedule;
