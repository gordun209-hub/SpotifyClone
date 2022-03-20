import { Playlist as p } from '@prisma/client'
import { NextApiRequest, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'

import GradientLayout from '../../components/gradientLayout'
import SongTable from '../../components/SongsTable'
import { validateToken } from '../../lib/auth'
import prisma from '../../lib/prisma'
import { getBGColor } from '../../lib/randomColor'

const Playlist: NextPage<{ playlist: p }> = ({ playlist }) => {
  const color = getBGColor(playlist.id)
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle='playlist'
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  )
}
export default Playlist
// write type for getServerSideProps

export const getServerSideProps = async ({
  query,
  req
}: {
  query: ParsedUrlQuery
  req: NextApiRequest
}) => {
  let user
  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN) as {
      id: number
    }
  } catch (e) {
    return {
      redirect: {
        parmanent: false,
        destination: '/signin'
      }
    }
  }
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: Number(query.id),
      userId: user.id
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true
            }
          }
        }
      }
    }
  })
  return {
    props: {
      playlist
    }
  }
}
