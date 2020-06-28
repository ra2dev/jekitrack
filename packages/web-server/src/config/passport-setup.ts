import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { User } from '../models/user.model'

passport.serializeUser((user: any, done: any) => {
  return done(null, user.id)
})

passport.deserializeUser(async (id: any, done: any) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: '770056324406-9te1fa2abgqp05gbgs6qk7mqg7t60he7.apps.googleusercontent.com',
      clientSecret: 'twU0Z2J3NYJ68p6FDeOLJhXl',
      callbackURL: 'http://localhost:3001/google/redirect',
      scope: [
        'https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
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
      secretOrKey: 'secret', // TODO REPLACE
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
