import { Router } from 'express'
import passport from 'passport'
import qs from 'query-string'

const authRoute = new Router()

authRoute.get('/google', passport.authenticate('google'))

authRoute.get('/google/redirect', passport.authenticate('google'), (req: any, res: any) => {
  res.redirect(`http://localhost:3000/handle-auth?${qs.stringify(req.user)}`)
})

export default authRoute
