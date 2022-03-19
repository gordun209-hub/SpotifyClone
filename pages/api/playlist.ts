import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

import { validateRoute } from '../../lib/auth'
import prisma from '../../lib/prisma'
//! this is also a protected route, first import higher order function we created
//! then make the validation from current cookie

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: User) => {
    //! get the user after validation if its valid and find all playlists of that user
    const playlists = await prisma.playlist.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        name: 'asc'
      }
    })
    //! response with playlists
    res.json(playlists)
  }
)
