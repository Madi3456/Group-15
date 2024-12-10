import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import {User} from "../models/SQLiteUserModel.js";

// Load environment variables from a .env file
const result = dotenv.config();
if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('Environment variables loaded successfully');
}

passport.use( 
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ where: { googleId: profile.id } });
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          username: profile.displayName,
          role: "admin",
        });
      }
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));


passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});

export default passport;