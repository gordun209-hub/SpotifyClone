import { NextApiRequest, NextApiResponse } from 'next'

import { validateRoute } from '../../lib/auth'

export default validateRoute(
  (req: NextApiRequest, res: NextApiResponse, user: string) => {
    res.json(user)
  }
)
