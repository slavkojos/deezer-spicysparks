import { useEffect } from 'react';
import {
  Container,
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Avatar,
  Text,
  HStack,
  Button,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { BsPlayCircle } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';
import { RiShareForwardLine } from 'react-icons/ri';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaylistDetails } from '../core/store/playlistDetailsSlice';
import { fetchUserInfo } from '../core/store/usersSlice';
import { fancyTimeFormat } from '../core/helperFunctions';
import { formatDistanceToNowStrict } from 'date-fns';
import { Helmet } from 'react-helmet';

import PlaylistTable from '../components/PlaylistTable';

export default function PlaylistDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.playlistDetails);
  const { user, loading: userLoading } = useSelector(state => state.userInfo);
  useEffect(() => {
    dispatch(fetchPlaylistDetails(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    if (loading === 'loaded') {
      dispatch(fetchUserInfo(data.creator.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);
  if (loading === 'idle') return <Box></Box>;
  if (loading === 'loading')
    return (
      <Center bg="gray.900" my={12}>
        <Spinner size="xl" thickness="4px" speed="1s" color="blue.500" />
      </Center>
    );
  return (
    <Box bg="gray.900">
      <Helmet>
        <title>{`Playlist / ${data.title}`}</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Container maxW="container.xl" color="white">
        <Flex width="100%" height="100%" direction="column">
          <Flex width="100%" p={2}>
            <Image
              boxSize="300px"
              objectFit="cover"
              src={data.picture_xl}
              alt="playlist-cover"
              borderRadius="md"
              mr={12}
            />
            <Flex direction="column">
              <Heading isTruncated>{data.title}</Heading>
              <HStack spacing="6px" my={5}>
                <Avatar src={user.picture_xl} mr={2} />
                <Text>{data.creator.name}</Text>
              </HStack>
              <Flex direction="column" color="gray.500">
                <Text>{data.description}</Text>
                <HStack>
                  <Text>{data.nb_tracks} tracks</Text>
                  <Text>-</Text>
                  <Text>{fancyTimeFormat(data.duration)}</Text>
                  <Text>-</Text>
                  <Text>
                    {new Intl.NumberFormat('en-US').format(data.fans)} fans
                  </Text>
                  <Text>-</Text>

                  <Text>
                    Updated:{' '}
                    {formatDistanceToNowStrict(
                      new Date(data['creation_date'].slice(0, 10))
                    )}{' '}
                    ago
                  </Text>
                </HStack>
                <HStack my={3} spacing="20px" color="gray.200">
                  <Button
                    colorScheme="red"
                    leftIcon={<BsPlayCircle />}
                    px={12}
                    size="lg"
                    borderRadius="full"
                  >
                    LISTEN
                  </Button>
                  <IconButton
                    isRound
                    colorScheme="whiteAlpha"
                    size="lg"
                    variant="outline"
                    aria-label="like"
                    icon={<FiHeart />}
                  />
                  <IconButton
                    isRound
                    colorScheme="whiteAlpha"
                    size="lg"
                    variant="outline"
                    aria-label="share"
                    icon={<RiShareForwardLine />}
                  />
                  <IconButton
                    isRound
                    colorScheme="whiteAlpha"
                    size="lg"
                    variant="outline"
                    aria-label="right"
                    icon={<BiDotsHorizontalRounded />}
                  />
                </HStack>
              </Flex>
            </Flex>
          </Flex>
          <Flex width="100%">
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <PlaylistTable />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
