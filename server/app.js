import dotenv from 'dotenv';
dotenv.config()

import express from 'express';

// middleware for authentication
import passport from 'passport';

//to implent google login
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import {Strategy as OAuth2Strategy, TokenError} from 'passport-oauth2'

import cors from 'cors';

//to parse cookies send by client
import cookieParser from 'cookie-parser';

import { oAuth } from './controllers/userController.js';
import userRoutes from './Routes/UserRoutes.js'
import connect_db from './config/db.js' ;
import oAuthRoutes from "./Routes/oAuth.Routes.js"
import otpRoutes from './Routes/otp.Routes.js'

const app = express();
const port = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'EMPTY'
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

// connect to the database
connect_db();


app.use(passport.initialize());
app.use(cookieParser());

// console.log('NODE_ENV : ', NODE_ENV);
// console.log('google client id : ', CLIENT_ID );
// console.log('google client secret : ', CLIENT_SECRET);


//parses incoming json requests
app.use(express.json());
app.use(express.urlencoded({extended : true}))
passport.use(new GoogleStrategy(
  {
    clientID : CLIENT_ID,
    clientSecret : CLIENT_SECRET,
    callbackURL : NODE_ENV === "development" ? "http://localhost:9000/auth/google/callback": "https://chimlen.onrender.com/auth/google/callback" 
    }, oAuth));

    OAuth2Strategy.prototype._createOAuthError = (msg, err) => {
      console.error('google oauth token error message : ', msg);
      console.error('full google response body : ', err);
      return new TokenError(msg, err.statusCode)
    }


app.use(cors({
  origin : ["http://localhost:5173", "https://chimlen.vercel.app", "https://chimlen.onrender.com"],
  credentials : true
}));


app.use('/api', userRoutes);
app.use('/auth', oAuthRoutes);
app.use('/api/otp', otpRoutes);

app.listen(port, () => {
  console.log('server is running on port : ', port)
})