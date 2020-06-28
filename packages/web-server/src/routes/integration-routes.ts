import { Router } from 'express'
import { authCheck } from '../middlewares/authHandler'

const route = new Router()

route.get('/integrations/jira', authCheck, (req: any, res: any) => {
  res.json({ success: 'true' })
})

export default route
