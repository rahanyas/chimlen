import express from 'express';
const router = express.Router();
import passport from 'passport';
import generateToken from '../utils/createToken.js';

router.get('/google', passport.authenticate('google', {
  scope : ["profile", "email"]
}));

router.get('/google/callback', passport.authenticate('google', {failureRedirect : '/',
  session : false
}), 
  (req, res) => {
    const token = generateToken(req.user, res);
    const redirectUrl = process.env.NODE_ENV === 'production' ? "https://chimlen-main.vercel.app/" : "http://localhost:5173/"
    res.redirect(`${redirectUrl}?token=${token}`)
  }
);

export default router;