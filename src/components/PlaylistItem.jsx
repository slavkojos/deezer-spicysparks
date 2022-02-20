import {
  Link,
  Flex,
  Image,
  Heading,
  Text,
  Box,
  IconButton,
} from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

export default function PlaylistItem({ playlist }) {
  return (
    <Link as={RouterLink} to={`/${playlist.type}/${playlist.id}`}>
      <Flex direction="column">
        <Box
          position="relative"
          transition=".3s ease"
          opacity={1}
          _hover={{
            opacity: 0.5,
          }}
        >
          <Image
            borderRadius="md"
            objectFit="cover"
            src={playlist.picture_big}
            alt="playlist-cover"
          />
          <IconButton
            isRound
            position="absolute"
            variant="ghost"
            left={3}
            bottom={3}
            backgroundColor="white"
            aria-label="Play button"
            icon={<FaPlay />}
          />
        </Box>
        <Box my={2}>
          <Heading color="gray.200" size="md">
            {playlist.title}
          </Heading>
          <Flex width="100%" color="gray.500" mt={1}>
            <Text mr={1}>{playlist.nb_tracks} tracks</Text>
            <Text mr={1}> · </Text>
            <Text>100000 fans</Text>
          </Flex>
        </Box>
      </Flex>
    </Link>
  );
}
