/* eslint-disable jsx-a11y/aria-proptypes */
import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text
} from '@chakra-ui/react'
import { useStoreActions } from 'easy-peasy'
import { useEffect, useRef, useState } from 'react'
import ReactHowler from 'react-howler'
import {
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
  MdOutlineRepeat,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious
} from 'react-icons/md'

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true)
  const [index, setIndex] = useState(0)
  const [seek, setSeek] = useState(0.0)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [duration, setDuration] = useState(0.0)
  const setPLayState = (value: boolean) => {
    setPlaying(value)
  }

  console.log({ activeSong })

  const onShuffle = () => {
    setShuffle(state => !state)
  }
  const onRepeat = () => {
    setRepeat(state => !state)
  }
  console.log(songs, 'songs')
  return (
    <Box>
      <Box>
        <ReactHowler playing={playing} src={activeSong.url} />
      </Box>
      <Center color={'gray.600'}>
        <ButtonGroup>
          <IconButton
            aria-label={'shuffle'}
            outline={'none'}
            variant={'link'}
            fontSize={'24px'}
            color={shuffle ? 'white' : 'gray.600'}
            icon={<MdShuffle />}
            onClick={onShuffle}
          />
          <IconButton
            aria-label={'skip'}
            outline={'none'}
            variant={'link'}
            fontSize={'24px'}
            icon={<MdSkipPrevious />}
          />
          {playing ? (
            <IconButton
              aria-label={'pause'}
              outline={'none'}
              variant={'link'}
              fontSize={'24px'}
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPLayState(false)}
            />
          ) : (
            <IconButton
              aria-label={'play'}
              outline={'none'}
              variant={'link'}
              fontSize={'40px'}
              icon={<MdOutlinePlayCircleFilled />}
              color={'white'}
              onClick={() => setPLayState(true)}
            />
          )}
          <IconButton
            aria-label={'next'}
            outline={'none'}
            variant={'link'}
            fontSize={'24px'}
            icon={<MdSkipNext />}
          />
          <IconButton
            aria-label={'repeat'}
            outline={'none'}
            variant={'link'}
            fontSize={'24px'}
            color={repeat ? 'white' : 'gray.600'}
            icon={<MdOutlineRepeat />}
            onClick={onRepeat}
          />
        </ButtonGroup>
      </Center>
      <Box color={'gray.600'}>
        <Flex justify={'center'} align={'center'}>
          <Box width={'10%'}>
            <Text fontSize={'xs'}>1:21</Text>
          </Box>
          <Box width={'80%'}>
            <RangeSlider
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={321}
              id={'player-range'}
            >
              <RangeSliderTrack bg={'gray.800'}>
                <RangeSliderFilledTrack bg={'gray.600'} />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width={'10%'} textAlign={'right'}>
            <Text fontSize={'xs'}>321</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
export default Player
