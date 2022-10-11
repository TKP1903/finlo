const express = require('express');
const passport = require('passport');
const Router = express.Router();




/*
Route     /google
Des       Google Signin
Params    none
Access    Public
Method    GET  
*/
Router.get(
    "/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    })
  );
  
  /*
  Route     /google/callback
  Des       Google Signin Callback
  Params    none
  Access    Public
  Method    GET  
  */
  Router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      // return res.json({token: req.session.passport.user.token})
      return res.redirect(
        `http://localhost:3000/google/${req.session.passport.user.token}`
      );
    }
  );
  
  module.exports= Router;