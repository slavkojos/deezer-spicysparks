import {
  Container,
  SimpleGrid,
  Box,
  Flex,
  Heading,
  IconButton,
  Skeleton,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import PlaylistItem from '../components/PlaylistItem';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaylists } from '../core/store/playlistsSlice';

export default function Home() {
  const dispatch = useDispatch();
  const { playlists, loading } = useSelector(state => state.playlists);

  useEffect(() => {
    dispatch(fetchPlaylists());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box height="100% " bg="gray.900">
      <Container maxW="container.xl">
        <Flex width="100%" height="100%" direction="column">
          <Flex
            justify="space-between"
            width="100%"
            my={4}
            pos="sticky"
            top={0}
            zIndex={2}
            bg="gray.900"
            py={2}
          >
            <Heading color="white">Featured playlists &gt;</Heading>
            <Box>
              <IconButton
                isRound
                colorScheme="whiteAlpha"
                size="lg"
                variant="ghost"
                aria-label="left"
                icon={<ChevronLeftIcon />}
              />
              <IconButton
                isRound
                colorScheme="whiteAlpha"
                size="lg"
                variant="ghost"
                aria-label="right"
                icon={<ChevronRightIcon />}
              />
            </Box>
          </Flex>
          <SimpleGrid columns={[2, 2, 4]} spacing={10}>
            {loading === 'loading' ? (
              <>
                <Skeleton
                  height="300px"
                  startColor="gray.300"
                  endColor="gray.700"
                  opacity={0.2}
                />
                <Skeleton
                  height="300px"
                  startColor="gray.300"
                  endColor="gray.700"
                  opacity={0.2}
                />
                <Skeleton
                  height="300px"
                  startColor="gray.300"
                  endColor="gray.700"
                  opacity={0.2}
                />
                <Skeleton
                  height="300px"
                  startColor="gray.300"
                  endColor="gray.700"
                  opacity={0.2}
                />
              </>
            ) : (
              playlists.map(playlist => (
                <PlaylistItem key={playlist.id} playlist={playlist} />
              ))
            )}
          </SimpleGrid>
        </Flex>
      </Container>
    </Box>
  );
}
