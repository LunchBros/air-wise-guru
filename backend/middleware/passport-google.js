import passport from "passport"
import * as dotenv from 'dotenv'
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../models/user.js"
dotenv.config()

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.DEV_URL + "/auth/google/callback",
    passReqToCallback: true,
    scope: ['profile', 'email']
  },
  async  (request, accessToken, refreshToken, profile, done) => {
    try {
        let existingUser = await UserModel.findOne({ googleId: profile.id})
        if (existingUser) {
            return done(null, existingUser)
        }

        const newUser = new UserModel({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value
        })
        await newUser.save()

        return done(null, newUser)
    } catch (error) {
        return  done(error, false)
    }
  }
));

passport.serializeUser(function(user, callback) {
    callback(null, user)
})

passport.deserializeUser(function(user, callback) {
    callback(null, user)
})

export default passport