import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

import prisma from './prisma'
//TODO add proper type
export const validateRoute = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN
    if (token) {
      let user
      try {
        const { id } = jwt.verify(token, 'hello') as { id: number }
        const user = await prisma.user.findUnique({
          where: { id }
        })
        if (!user) {
          throw new Error('Not real user')
        }
      } catch (e) {
        res.status(401)
        res.json({ error: 'Not authorized' })
        return
      }
      return handler(req, res, user)
    }
    res.status(401)
    res.json({ error: 'Not Authorized' })
  }
}
