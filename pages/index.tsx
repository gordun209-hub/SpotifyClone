import { Box, Flex, Text } from '@chakra-ui/layout'
import { Artist } from '@prisma/client'
import type { GetServerSideProps, NextPage } from 'next'

import ArtistContainer from '../components/Artist'
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
            <ArtistContainer
              key={artist.id}
              id={artist.id}
              name={artist.name}
            />
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
