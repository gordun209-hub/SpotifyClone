import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import { Artist } from '@prisma/client'
import type { GetServerSideProps, NextPage } from 'next'

import GradientLayout from '../components/gradientLayout'
import { useMe } from '../lib/hooks'
import prisma from '../lib/prisma'

const Home: NextPage<{ artists: Artist[] }> = ({ artists }) => {
  const { user } = useMe()

  return (
    <GradientLayout
      roundImage={true}
      color='red'
      subtitle='profile'
      title={`${user?.firstName} ${user?.lastName}'s profile`}
      description={`${user?.playlistCount} playlists`}
      image='https://avatars.githubusercontent.com/u/80384450?s=96&v=4'
    >
      <Box color='white' paddingX='40px'>
        <Box marginBottom={'40px'}>
          <Text fontSize={'2xl'} fontWeight='bold'>
            Top artists this month
          </Text>
          <Text fontSize={'md'}>Top artists this month</Text>
        </Box>
        <Flex>
          {artists.map(artist => (
            <Box key={artist.id} paddingX='10px' width={'20%'}>
              <Box
                bg='gray.900'
                borderRadius={'4px'}
                padding='15px'
                width='100%'
              >
                <Image
                  src='https://i.pinimg.com/originals/4d/79/99/4d7999a51a1a397189a6f98168bcde45.jpg'
                  borderRadius={'100%'}
                />
                <Box marginTop={'20px'}>
                  <Text fontSize={'large'}>{artist.name}</Text>
                  <Text fontSize={'x-small'}>Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})
  return {
    props: { artists }
  }
}
export default Home
