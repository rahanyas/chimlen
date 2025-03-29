import express from 'express';
const router = express.Router();
import passport from 'passport';
import generateToken from '../utils/createToken.js';
import url from 'url'

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
    const token = generateToken(req.user, res);
    const redirectUrl = process.env.NODE_ENV === "development" ? "http://localhost:9000/auth/google/callback" : "https://chimlen-main.vercel.app/auth/google/callback"
    console.log('redirect url:',redirectUrl);
    res.redirect(redirectUrl+token)
  }
);

export default router;