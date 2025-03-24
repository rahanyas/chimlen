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

try {
  connect_db();
} catch (err) {
  console.log('database connetction failed', err);
  process.exit(1)
}


app.use(passport.initialize());
app.use(cookieParser());

//parses incoming json requests
app.use(express.json());

passport.use(new GoogleStrategy(
  {
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : '/auth/google/callback'
  }, oAuth));


app.use(cors({
  origin : process.env.FRONTEND_URL,
  credentials : true
}));

app.use('/api', userRoutes);
app.use('/auth', oAuthRoutes)

app.listen(port, () => {
  console.log('server is running on port : ', port)
})
