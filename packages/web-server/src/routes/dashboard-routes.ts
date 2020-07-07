import { Router } from 'express'
import passport from 'passport'

const route = new Router()

route.get('/total', passport.authenticate('google'), () => /** TODO **/ null)

export default authRoute
