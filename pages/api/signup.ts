/* eslint-disable import/no-anonymous-default-export */
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //! generate salt
  const salt = await bcrypt.genSaltSync(10)
  //! get email and password from body for login
  const { email, password, firstName, lastName } = req.body
  let user
  try {
    //! create user with prisma client and hash given password
    user = await prisma.user.create({
      data: {
        lastName,
        firstName,
        email,
        password: bcrypt.hashSync(password, salt)
      }
    })
  } catch (e) {
    res.status(401).json((e as Error).message)
    return
  }
  //! generate token for user with user informaton
  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now()
    },
    'hello',
    { expiresIn: '8h' }
  )
  //! set header for cookie
  res.setHeader(
    'Set-cookie',
    cookie.serialize('TRAX_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })
  )
  //! response with user
  res.json(user)
}
