import { Box } from '@chakra-ui/layout'
import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BsFillPlayFill } from 'react-icons/bs'

import { formatDate, formatTime } from '../lib/formatters'

const SongTable = ({ songs }) => {
  return (
    <Box bg='transparent' color={'white'}>
      <Box padding={'10px'} marginBottom={'20px'}>
        <Box marginBottom={'30px'}>
          <IconButton
            colorScheme={'green'}
            size={'lg'}
            isRound={true}
            icon={<BsFillPlayFill fontSize={'30px'} />}
            aria-label={'play-btn'}
          />
        </Box>
        <Table variant={'unstyled'}>
          <Thead
            borderBottom={'1px solid'}
            borderColor={'rgba(255,255,255,0.2)'}
          >
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs?.map((song, i) => (
              <Tr
                key={song?.id}
                cursor='cursor'
                sx={{
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                <Td>{i + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}
export default SongTable
