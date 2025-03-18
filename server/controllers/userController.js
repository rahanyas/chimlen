import User from "../modal/userModal.js";
import bcrypt from 'bcrypt'
import generateToken from "../utils/createToken.js";
import jwt from 'jsonwebtoken'

export const handleSignup = async (req, res) => {
  try {
    const {userName, email, mobile, password} = req.body
   
    if(!password || !email || !mobile){
      return res.status(400).json({msg : 'all feilds are required'})
    }
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
     
    generateToken(newUser._id, res);

    return res.status(200).json({data : newUser})
  } catch (error) {
    return res.status(400).json({error : error.message})
  }

};

export const checkUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    
    if(!token){
     return res.json({status : false, msg : 'no token provided'})
    };
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const user = await User.findOne({_id : decoded.id})
    console.log('user : ', user);
    if(!user){
      return res.status(400).json({status : false, msg : 'user not found'})
    };
 
    return res.status(200).json({status : true})
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({status : false , msg : 'internal server error'})
  }
};


export const handleLogout = async (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    return res.status(200).json({status : false, msg : 'user logout successfully'})
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg : 'internal server error'})
  }
}