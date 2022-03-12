import {
  Button,
  HStack,
  Heading,
  IconButton,
  Icon,
  Tooltip,
  VStack,
  Text,
} from '@chakra-ui/react';
import { format, isEqual, isToday, subDays } from 'date-fns';
import { CalendarViewType, useCalendar } from '@h6s/calendar';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

type Props = {
  selectedDate: Date;
  onChange: (date: Date) => void;
};

const DayPicker = ({ selectedDate, onChange }: Props) => {
  const { body, navigation } = useCalendar({
    defaultViewType: CalendarViewType.Week,
    defaultWeekStart: 1,
    defaultDate: selectedDate,
  });

  const weekStart = body.value[0].value[0].value;
  const weekEnd = body.value[0].value[6].value;
  const weekFormat = 'MMM d, yyyy';

  return (
    <>
      <HStack justify="space-between">
        <Button size="sm" onClick={navigation.setToday}>
          Today
        </Button>
        <HStack>
          <Tooltip label="Previous week">
            <IconButton
              size="sm"
              colorScheme="gray"
              aria-label="Previous week"
              icon={<Icon as={HiChevronLeft} />}
              onClick={navigation.toPrev}
              disabled={weekStart <= new Date()}
            />
          </Tooltip>
          <Tooltip label="Next week">
            <IconButton
              size="sm"
              colorScheme="gray"
              aria-label="Next week"
              icon={<Icon as={HiChevronRight} />}
              onClick={navigation.toNext}
            />
          </Tooltip>
          <Heading size="md">
            {format(weekStart, weekFormat)} - {format(weekEnd, weekFormat)}
          </Heading>
        </HStack>
      </HStack>
      <HStack spacing={0} rounded="md" overflow="hidden">
        {body.value[0].value.map(({ key, isCurrentDate, value: day }) => {
          const isDisabled = day < subDays(new Date(), 1);
          let color = 'inherit';
          let bg = 'gray.900';

          if (isCurrentDate) {
            color = 'white';
            bg = 'purple.500';
          } else if (isToday(day)) {
            color = 'purple.400';
          }

          return (
            <VStack
              key={key}
              as="button"
              p={4}
              bg={bg}
              minW={32}
              color={color}
              disabled={isDisabled}
              transition="all 0.25s ease-out"
              _hover={{
                bg: isCurrentDate ? 'purple.700' : 'whiteAlpha.100',
                color: 'white',
              }}
              _disabled={{
                bg: 'gray.900',
                color: 'whiteAlpha.500',
              }}
              onClick={() => {
                navigation.setDate(day);
                onChange(day);
              }}
            >
              <Heading>{day.getDate()}</Heading>
              <Text>{format(day, 'EEEE')}</Text>
            </VStack>
          );
        })}
      </HStack>
    </>
  );
};

export default DayPicker;
