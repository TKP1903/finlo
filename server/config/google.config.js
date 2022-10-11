const googleOAuth = require('passport-google-oauth20');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config({
  path: require("path").resolve(__dirname, "../.env"),
});

const GoogleStrategy = googleOAuth.Strategy;

module.exports =  (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "491756517825-l4imo5kid5sk5371d2o1f6itjd938lcu.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:4000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        // creating a new user object
        const newUser = {
          fullname: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value,
        };
        try {
          // check if the user exist
          // const user = await UserModel.findOne({ email: newUser.email });
          console.log({newUser});
          const token = jwt.sign({ user: "23429y982" }, "Finlo");
          console.log(token);
          done(null, { newUser, token });
          // if (user) {
          //   // generate token
          //   const token = user.generateJwtToken();
          //   // return user
          //   done(null, { user, token });
          // } else {
          //   // create new user
          //   const user = await UserModel.create(newUser);

          //   // generate token
          //   const token = user.generateJwtToken();
          //   // return user
          //   done(null, { user, token });
          // }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((userData, done) => done(null, { ...userData }));
  passport.deserializeUser((id, done) => done(null, id));
};
