import User from "../modal/userModal.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/createToken.js";
import jwt from 'jsonwebtoken';

export const handleSignup = async (req, res) => {
  try {
    const {userName, email, mobile, password} = req.body
   
    if(!password || !email || !mobile){
      return res.status(400).json({msg : 'all feilds are required'})
    };

    const isExistingUser = await User.findOne({email : email});

    if(isExistingUser){
      return res.status(400).json({error : 'user already exits'});
    };
    
    const salt =  bcrypt.genSaltSync(10);

    const hashedPasss =  bcrypt.hashSync(password, salt)

    const newUser = await User.create({
        userName,
        email,
        mobile,
        password : hashedPasss,
        provider : "local"
    });

    if(!newUser){
      return res.status(400).json({error : 'user not saved'})
    };
     
    generateToken(newUser._id, res)
    return res.status(200).json({data : newUser})
  } catch (error) {
    return res.status(400).json({error : error.message})
  }

};

export const handleLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password){
     return res.status(400).json({msg : 'all feilds are required'})
    };
     
    const user = await User.findOne({email : email});
    console.log('user : ', user);
    
    if(!user){
     return res.status(400).json({msg : 'User not found', status : false, loading : true})
    };

    const isMatch =  bcrypt.compareSync(password, user.password);

    if(user.provider === 'google' && user.password ){
          if(!isMatch){
            return res.status(400).json({msg : "invalid credentials", status : false, loading : true})
          }
        generateToken(user._id, res);
         return res.status(200).json({msg : 'Login successfull', status : true, loading : false})
    }

    if(user.provider.includes('google')){
      return res.status(400).json({msg : "This email is linked to google.please log in with google account", status : false, loading : true})
    }
 
    if(!isMatch){
     return res.status(400).json({msg : "invalid credentials", status : false, loading : true})
    }
     
    generateToken(user._id, res);
    console.log('token created : ', req.cookies.token)
    return res.status(200).json({msg : 'Login successfull', status : true, loading : false})
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg : 'internal server error', status : false, loading : true})
  }

}

export const checkUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if(!token){
     return res.json({status : false, msg : 'no token provided', loading : false})
    };
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    const user = await User.findOne({_id : decoded.id})
    // console.log('user : ', user);
    if(!user){
      return res.status(400).json({status : false, msg : 'user not found', loading : false})
    };
 
    return res.status(200).json({status : true, loading : false})
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({status : false , msg : 'internal server error', loading : true})
  }
};

export const oAuth = async (aToken, rToken, profile, done) => {
  try {
    let user = await User.findOne({googleId : profile.id});
    if(!user){
      user = new User({
        googleId : profile.id,
        userName : profile.displayName,
        email : profile.emails[0].value,
        profilePic : profile.photos[0].value,
        provider : 'google'
      }) 
      await user.save()
    };
    return done(null, user)
  } catch (err) {
    console.log('error in oAuth : ', err.message);
    return done(err, null)
  }
};



export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password -provider -mobile');
    // console.log(users);
    
    return res.status(200).json({data : users})
  } catch (err) {
    console.log('Error in getUsers : ', err.message);
    return res.status(500).json({msg : 'Internal Server Error'});
  }
}

export const handleLogout = async (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    return res.status(200).json({status : false, msg : 'user logout successfully'})
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg : 'internal server error'})
  }
}

