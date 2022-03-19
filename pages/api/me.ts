import { NextApiRequest, NextApiResponse } from 'next'

//! for getting user
import { validateRoute } from '../../lib/auth'
//! this is for checking user is walid, protected route, response the user after check
export default validateRoute(
  (req: NextApiRequest, res: NextApiResponse, user: string) => {
    res.json(user)
  }
)
