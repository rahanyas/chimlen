import express from 'express';
const router = express.Router();
import passport from 'passport';
import generateToken from '../utils/createToken.js';

router.get('/google', passport.authenticate('google', {
  scope : ["profile", "email"]
}));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect : '/login',
  session : false
}), 
  (req, res) => {
    // console.log(process.env.NODE_ENV)
    const token = generateToken(req.user, res);
    const redirectUrl = process.env.NODE_ENV !== 'development' ? "https://chimlen-main.vercel.app/": "http://localhost:5173/" 
    console.log(redirectUrl);
    res.redirect(redirectUrl)
  }
);

export default router;