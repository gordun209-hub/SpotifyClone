/* eslint-disable import/no-anonymous-default-export */
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //! get email and password from request body
  const { email, password } = req.body
  //! find user with prisma client
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })
  //! if user exist and passwords match
  if (user && bcrypt.compareSync(password, user.password)) {
    //! create jsonwebtoken for given information
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        time: Date.now()
      },
      'hello',
      {
        expiresIn: '8h'
      }
    )
    //! set token and cookie at header
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('TRAX_ACCESS_TOKEN', token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      })
    )
    //!response with json
    res.json(user)
  } else {
    res.status(401)
    res.json({ error: 'Email or password is wrong' })
  }
}
