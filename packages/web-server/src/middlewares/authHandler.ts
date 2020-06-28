import passport from 'passport'

export const authCheck = passport.authenticate('jwt', { session: false })
