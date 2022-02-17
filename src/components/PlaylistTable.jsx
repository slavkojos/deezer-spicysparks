import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Icon,
  Checkbox,
  Skeleton,
} from '@chakra-ui/react';
import { BiTimeFive } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import TrackItem from './TrackItem';

export default function PlaylistTable() {
  const { data: tracklist, loading } = useSelector(
    state => state.playlistDetails
  );
  return (
    <Table variant="unstyled" color="gray.200" width="100%">
      <Thead borderBottom="1px" color="gray.500">
        <Tr>
          <Th>Track</Th>
          <Th>Artist</Th>
          <Th>Album</Th>
          <Th>Added</Th>
          <Th>
            <Icon boxSize="20px" as={BiTimeFive} />
          </Th>
          <Th>
            <Checkbox colorScheme="gray" color="gray.500"></Checkbox>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {loading === 'loaded' ? (
          tracklist.tracks.data.map((track, index) => (
            <TrackItem key={index} track={track} />
          ))
        ) : (
          <>
            <Skeleton
              height="50px"
              startColor="gray.300"
              endColor="gray.700"
              opacity={0.2}
            />
            <Skeleton
              height="50px"
              startColor="gray.300"
              endColor="gray.700"
              opacity={0.2}
            />
            <Skeleton
              height="50px"
              startColor="gray.300"
              endColor="gray.700"
              opacity={0.2}
            />
            <Skeleton
              height="50px"
              startColor="gray.300"
              endColor="gray.700"
              opacity={0.2}
            />
          </>
        )}
      </Tbody>
    </Table>
  );
}
