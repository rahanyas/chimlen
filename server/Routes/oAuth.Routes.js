import express from 'express';
const router = express.Router();
import passport from 'passport';
import generateToken from '../utils/createToken.js';

router.get('/google', passport.authenticate('google', {
  scope : ["profile", "email"]
}));

router.get('/google/callback', passport.authenticate('google', {
  session : false
}), 
  (req, res) => {
     console.log('req user : ',req.user);
     if(!req.user){
      console.log('authentication failed : req.user is udnefined');
       return res.status(401).json({status : false, msg : 'authentication failed'})
     }
     
    generateToken(req?.user?._id, res);
    console.log("generated token : ", req.cookies.token);
    
    // put frontend url here
    const redirectUrl = process.env.NODE_ENV === "development" ? "http://localhost:5173/home"  : "https://chimlen.vercel.app"
    console.log('redirect url:',redirectUrl);
    return res.redirect(redirectUrl)
    
  }
);


export default router;