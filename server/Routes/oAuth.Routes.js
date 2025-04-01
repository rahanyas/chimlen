import express from 'express';
const router = express.Router();
import passport from 'passport';
import generateToken from '../utils/createToken.js';
import url from 'url'
import { log } from 'console';

router.get('/google', passport.authenticate('google', {
  scope : ["profile", "email"]
}));

router.get('/google/callback', passport.authenticate('google', {
  session : false
}), 
  (req, res) => {
    let q = url.parse(req.url, true).query;
    if(q.error) {
      console.log('Error : ', q.error);   
    }
    generateToken(req.user, res);
    const token = req.cookies.token
    console.log("token : ", token);
    
    // put frontend url here
    const redirectUrl = process.env.NODE_ENV === "development" ? "http://localhost:5173/"  : "https://chimlen.vercel.app/"
    console.log('redirect url:',redirectUrl);
    res.redirect(redirectUrl)
  }
);


export default router;