import otpHandlerInstance from "./otp.controllers.js";

class NewPassword {
  constructor(){
    this.otpHandler = otpHandlerInstance;
  }

   resetPassword = async (req,res) => {
    const email = this.otpHandler.savedEmail;
    const {password} = req.body;
    console.log('email : ', email);
    console.log('pass :  ',password)
    if(!email){
      return res.status(400).json({msg : 'email not found'})
    }
    if(!password){
      return res.status(400).json({msg : 'please enter a password'})
    }
  }
};

export default new NewPassword()