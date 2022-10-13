require('dotenv').config();
const express = require('express');
const passport = require('passport');
const { default: helmet } = require('helmet');
const cors = require('cors');
const session = require('express-session');


//configs
const googleAuthConfig = require('./config/google.config');
const routeConfig = require('./config/route.config');

//microservice routes 
const Auth = require('./api/Auth');
const Docs = require("./api/files/index");

const Finlo = express();

// Authentication configuration
Finlo.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "finlo_taX_app",
  })
);

// application middlewares
Finlo.use(express.json());
Finlo.use(express.urlencoded({ extended: false }));
Finlo.use(helmet());
Finlo.use(cors());
Finlo.use(passport.initialize());
Finlo.use(passport.session());

//passport configuration
googleAuthConfig(passport);
routeConfig(passport);

//Application routes
Finlo.use("/auth", Auth);
Finlo.use("/file", Docs);

Finlo.get('/', (req, res) => res.json("Welcome to Finlo"))

const PORT = process.env.PORT || 4000;
Finlo.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))