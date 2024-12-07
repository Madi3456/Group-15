import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import ModelFactorUsers from "../models/SQLiteUserModel.js";

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
      let user = await ModelFactorUsers.findOne({ where: { googleId: profile.id } });
      if (!user) {
        user = await ModelFactorUsers.create({
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
  const user = await ModelFactorUsers.findByPk(id);
  done(null, user);
});

export default passport;