import otpHandlerInstance from "./otp.controllers.js";
import User from "../modal/userModal.js";
import otpModal from "../modal/otpModal.modal.js";
import bcrypt from 'bcrypt'
class NewPassword {
  constructor(){
    this.otpHandler = otpHandlerInstance;
  }

   resetPassword = async (req,res) => {
    try {
      const email = this.otpHandler.savedEmail;
      const {password} = req.body;
      console.log('email : ', email);
      console.log('pass : ',password)
      if(!email){
        return res.status(400).json({msg : 'email not found'})
      }
      if(!password){
        return res.status(400).json({msg : 'please enter a password'})
      };
  
      const saltRounds = 10;
      const hashedPass = await bcrypt.hash(password, saltRounds)
      const updatedUser = await User.findOneAndUpdate({email : email}, {$set : {password : hashedPass}},{new : true})
      if(!updatedUser){
        return res.status(404).json({msg : 'User not found'})
      }
      await otpModal.deleteOne({email})
      return res.status(200).json({msg : 'password resest successfully'})
    } catch (err) {
      console.log(err);
      return res.status(500).json({msg : 'internal server error'});
    }
  }
};

export default new NewPassword()