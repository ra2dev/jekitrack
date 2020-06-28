import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { User } from '../models/user/user.model'

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret', // TODO REPLACE
  algorithms: ['RS256'],
}

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
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.sub)
      if (!user) {
        done(null, false)
      }
      done(null, user)
    } catch (err) {
      done(err)
    }
  })
)

// cluster0-shard-00-01-ehaih.mongodb.net:27017
// 4/1QFHfZh-s3qvID4Kv7AhCCYswRswq6FblRj-a3wSJKjoDTtksnBrfl3Fqgj7LwyK4ff7OFj_VXLU1XUfcbs6I9E&scope=email%20https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly%20https://www.googleapis.com/auth/userinfo.email%20openid&authuser=1&prompt=consent
