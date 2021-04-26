import { Router } from 'express'
import passport from 'passport'
import qs from 'query-string'
import { config } from '../config'

// @ts-ignore
const authRoute = new Router()

authRoute.get('/google', passport.authenticate('google'))

authRoute.get('/google/redirect', passport.authenticate('google'), (req: any, res: any) => {
  res.redirect(`${config.clientWebUrl}/handle-auth?${qs.stringify(req.user)}`)
})

export default authRoute
