import { Router } from 'express'
import passport from 'passport'

// @ts-ignore
const route = new Router()

route.get('/total', passport.authenticate('google'), () => null)

export default authRoute
