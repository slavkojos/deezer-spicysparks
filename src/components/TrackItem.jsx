import {
  Tr,
  Td,
  Image,
  Flex,
  Text,
  Checkbox,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { fancyTimeFormat } from '../core/helperFunctions';
import { format, fromUnixTime } from 'date-fns';
import { BiMicrophone, BiDotsHorizontalRounded } from 'react-icons/bi';
import { FiHeart } from 'react-icons/fi';
export default function TrackItem({ track }) {
  return (
    <Tr
      height="60px"
      transition=".2s ease"
      cursor="pointer"
      _hover={{
        backgroundColor: 'gray.700',
      }}
      align="center"
    >
      <Td width="50%">
        <Flex align="center" justify="space-between" width="100%">
          <Flex align="center">
            <Image
              src={track.album.cover_xl}
              objectFit="cover"
              height="50px"
              mr={2}
            />
            <Text fontSize="lg">{track.title}</Text>
          </Flex>
          <Box>
            <IconButton
              isRound
              colorScheme="whiteAlpha"
              size="lg"
              variant="ghost"
              aria-label="mic"
              icon={<BiMicrophone />}
            />
            <IconButton
              isRound
              colorScheme="whiteAlpha"
              size="lg"
              variant="ghost"
              aria-label="like"
              icon={<FiHeart />}
            />
            <IconButton
              isRound
              colorScheme="whiteAlpha"
              size="lg"
              variant="ghost"
              aria-label="dots"
              icon={<BiDotsHorizontalRounded />}
            />
          </Box>
        </Flex>
      </Td>
      <Td width="20%">{track.artist.name}</Td>
      <Td noOfLines={1}>{track.album.title}</Td>
      <Td>{format(new Date(fromUnixTime(track.time_add)), 'dd/MM/yyyy')}</Td>
      <Td>{fancyTimeFormat(track.duration)}</Td>
      <Td>
        <Checkbox></Checkbox>
      </Td>
    </Tr>
  );
}
