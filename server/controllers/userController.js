import User from "../modal/userModal.js";
import bcrypt from 'bcrypt'
import generateToken from "../utils/createToken.js";
import jwt from 'jsonwebtoken'

export const handleSignup = async (req, res) => {
  try {
    const { user } = req.body;
    const {userName, email, mobile, password} = user

    const salt = await bcrypt.genSalt(10);

    const hashedPasss = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        userName,
        email,
        mobile,
        password : hashedPasss
    });

    const token = generateToken(newUser._id, res);
    console.log(token)
 
    if(!newUser){
      return res.status(400).json({error : 'user not saved'})
    };

    return res.status(200).json({data : newUser})
  } catch (error) {
    return res.status(400).json({error : error.message})
  }

};

export const checkUser = async (req, res) => {
   const token = req.cookies.token;
   if(!token){
    return res.status(400).json({status : false})
   };
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   console.log(decoded);
   const user = await User.find({_id : decoded.id})
   console.log(user);
   
   if(!decoded){
    return res.status(400).json({status : false})
   };

   return res.status(200).json({status : true, user : user._id})
}