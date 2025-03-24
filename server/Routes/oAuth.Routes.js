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
    res.redirect(process.env.FRONTEND_URL)
  }
);

export default router;