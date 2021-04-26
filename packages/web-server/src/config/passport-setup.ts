import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { User } from '../models/user.model'
import { config } from '../config'

passport.serializeUser((user: any, done: any) => {
  return done(null, user.id)
})

passport.deserializeUser(async (id: any, done: any) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(
  // @ts-ignore
  new GoogleStrategy(
    {
      clientID: config.googleAuthClientId,
      clientSecret: config.googleAuthClientSecret,
      callbackURL: config.googleAuthCallbackUrl,
      scope: config.googleAuthScope,
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      const existingUser: any = await User.findOne({ googleId: profile.id })
      if (existingUser) {
        done(null, existingUser.toAuthJSON())
        return
      }
      const newUser: any = await new User({
        email: profile.emails?.[0]?.value,
        profileImageUrl: profile.photos?.[0]?.value,
        googleId: profile.id,
      }).save()
      done(null, newUser.toAuthJSON())
    }
  )
)

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.sessionCookieKey, // TODO REPLACE
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.id)
        if (!user) {
          done(null, false)
        }
        done(null, user)
      } catch (err) {
        done(err)
      }
    }
  )
)
