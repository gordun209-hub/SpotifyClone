import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

//! for getting user
import { validateRoute } from '../../lib/auth'
import prisma from '../../lib/prisma'
//! this is for checking user is walid, protected route, response the user after check
export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: User) => {
    const playlistCount = await prisma.playlist.count({
      where: {
        userId: user.id
      }
    })
    res.json({ ...user, playlistCount })
  }
)
