const JwtPassport = require('passport-jwt');
const dotenv = require('dotenv');

const jwt = require('jsonwebtoken');dotenv.config({
  path: require("path").resolve(__dirname, "../.env"),
});
// Database Model
// import { UserModel } from "../database/user";

const JWTStratergy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "Finlo",
};

module.exports = (passport) => {
  passport.use(
    new JWTStratergy(options, async (jwt__payload, done) => {
      try {
        // const doesUserExist = await UserModel.findById(jwt__payload.user);
        // if (!doesUserExist) return done(null, false);
        return done(null);
      } catch (error) {
        throw new Error(error);
      }
    })
  );
};
 


