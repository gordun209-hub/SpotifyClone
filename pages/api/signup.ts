/* eslint-disable import/no-anonymous-default-export */
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = await bcrypt.genSaltSync(10)
  const { email, password } = req.body
  let user
  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt)
      }
    })
  } catch (e) {
    res.status(401)
    res.json({ error: 'user already exixst' })
    return
  }
  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now()
    },
    'hello',
    { expiresIn: '8h' }
  )
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
  res.json(user)
}
