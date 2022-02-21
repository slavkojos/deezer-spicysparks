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
import { useState, useEffect } from 'react';
import { prominent } from 'color.js';

export default function PlaylistItem({ playlist }) {
  const [dominantColor, setDominantColor] = useState('black');
  const getDominantColor = async () => {
    setDominantColor(
      await prominent(playlist.picture_medium, { amount: 1, format: 'hex' })
    );
  };
  useEffect(() => {
    getDominantColor();
  }, []);
  return (
    <Link
      as={RouterLink}
      to={`/${playlist.type}/${playlist.id}`}
      data-testid="playlist-item"
    >
      <Flex direction="column">
        <Box
          position="relative"
          transition=".3s ease"
          filter="auto"
          _hover={{
            filter: `drop-shadow(0px 0px 12px ${dominantColor}) brightness(0.8)`,
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
