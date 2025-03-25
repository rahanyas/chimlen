import express from 'express';

// middleware for authentication
import passport from 'passport';

//to implent google login
import {Strategy as GoogleStrategy} from "passport-google-oauth20"

import dotenv from 'dotenv';
dotenv.config()

import cors from 'cors';

//to parse cookies send by client
import cookieParser from 'cookie-parser';

import { oAuth } from './controllers/userController.js';
import userRoutes from './Routes/UserRoutes.js'
import connect_db from './config/db.js' ;
import oAuthRoutes from "./Routes/oAuth.Routes.js"

const app = express();
const port = process.env.PORT;

connect_db();


app.use(passport.initialize());
app.use(cookieParser());

//parses incoming json requests
app.use(express.json());

passport.use(new GoogleStrategy(
  {
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL :  process.env.NODE_ENV === "production"
    ? `${process.env.VERCEL_URL}/auth/google/callback`
    : "http://localhost:9000/auth/google/callback"
  }, oAuth));
console.log(process.env.VERCEL_URL)
app.use(cors({
  origin : function (origin, callaback){
    console.log('Requested origin:', origin || 'undefined (possibly server-side request)')
    const allowedOrigins = process.env.FRONTEND_URL.split(',');
    console.log(allowedOrigins)
    if(!origin || allowedOrigins.includes(origin)){
      callaback(null, true)
      console.log(callaback)
    }else{
      callaback(new Error('Not Allowed by cors'))
    }
  },
  credentials : true
}))

app.use('/api', userRoutes);
app.use('/auth', oAuthRoutes)

app.listen(port, () => {
  console.log('server is running on port : ', port)
})
