import express from 'express';
import passport from 'passport';
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import dotenv from 'dotenv';
dotenv.config()

import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './Routes/UserRoutes.js'
import connect_db from './config/db.js' ;
import generateToken from './utils/createToken.js';

const app = express();
const port = process.env.PORT;
connect_db();

app.use(passport.initialize());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(new GoogleStrategy(
  {
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : '/auth/google/callback'
  },
  (accesToken, refreshToken, profile, done) => {
    console.log("user profile : ", profile);
    return done(null, profile)
    
  }
));


app.get('/auth/google', passport.authenticate('google', {
  scope : ['profile', 'email']
}));

app.get('/auth/google/callback', 
  passport.authenticate('google', {failureRedirect : '/', session : false}),
  (req, res) => {
    const token = generateToken(req.user, res);
    res.redirect(process.env.FRONTEND_URL);
  }
)

app.use(cors({
  origin : process.env.FRONTEND_URL,
  credentials : true
}));

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log('server is running on port : ', port)
})
