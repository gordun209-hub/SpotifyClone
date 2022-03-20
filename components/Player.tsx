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

import { formatTime } from '../lib/formatters'

const Player = ({ songs, activeSong }) => {
  const soundRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [index, setIndex] = useState(
    songs.findIndex(s => s.id === activeSong.id)
  )
  const [seek, setSeek] = useState(0.0)
  const [repeat, setRepeat] = useState(false)
  const repeatRef = useRef(repeat)
  const [shuffle, setShuffle] = useState(false)
  const [duration, setDuration] = useState(0.0)
  const [isSeeking, setIsSeeking] = useState(false)
  const setActiveSong = useStoreActions((s: any) => s.changeActiveSong)
  useEffect(() => {
    setActiveSong(songs[index])
  }, [index, setActiveSong, songs])
  useEffect(() => {
    let timerId
    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek())
        timerId = requestAnimationFrame(f)
      }
      timerId = requestAnimationFrame(f)
      return () => cancelAnimationFrame(timerId)
    }
    cancelAnimationFrame(timerId)
  }, [playing, isSeeking])
  useEffect(() => {
    repeatRef.current = repeat
  }, [repeat])
  const setPLayState = (value: boolean) => {
    setPlaying(value)
  }

  const onShuffle = () => {
    setShuffle(state => !state)
  }
  const onRepeat = () => {
    setRepeat(state => !state)
  }
  const prevSong = () => {
    setIndex(state => {
      return state ? state - 1 : songs.length - 1
    })
  }
  const nextSong = () => {
    setIndex(state => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length)
        if (next === state) {
          return nextSong()
        }
        return next
      }
      return state === songs.length - 1 ? 0 : state + 1
    })
  }
  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0)
      soundRef.current.seek(0)
    } else {
      nextSong()
    }
  }
  const onLoad = () => {
    const songDuration = soundRef.current.duration()
    setDuration(songDuration)
  }
  const onSeek = (e: any[]) => {
    setSeek(parseFloat(e[0]))
    soundRef.current.seek(e[0])
  }
  return (
    <Box>
      <Box>
        <ReactHowler
          ref={soundRef}
          playing={playing}
          src={activeSong.url}
          onLoad={onLoad}
          onEnd={onEnd}
        />
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
            onClick={prevSong}
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
            onClick={nextSong}
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
            <Text fontSize={'xs'}>{formatTime(seek)}</Text>
          </Box>
          <Box width={'80%'}>
            <RangeSlider
              max={duration ? (duration.toFixed(2) as unknown as number) : 0}
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              value={[seek]}
              id={'player-range'}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
              onChange={onSeek}
            >
              <RangeSliderTrack bg={'gray.800'}>
                <RangeSliderFilledTrack bg={'gray.600'} />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width={'10%'} textAlign={'right'}>
            <Text fontSize={'xs'}>{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
export default Player
