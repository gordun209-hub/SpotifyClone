import { Box, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import { FC } from 'react'

interface IProps {
  id: number
  name: string
}
const ArtistContainer: FC<IProps> = ({ id, name }) => {
  return (
    <Box key={id} paddingX='10px' width={'20%'}>
      <Box bg='gray.900' borderRadius={'4px'} padding='15px' width='100%'>
        <Image
          alt='artist'
          src='https://i.pinimg.com/originals/4d/79/99/4d7999a51a1a397189a6f98168bcde45.jpg'
          borderRadius={'100%'}
        />
        <Box marginTop={'20px'}>
          <Text fontSize={'large'}>{name}</Text>
          <Text fontSize={'x-small'}>Artist</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default ArtistContainer
