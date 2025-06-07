import otpModal from "../modal/otpModal.modal.js";
import sendEmail from "../utils/sendMail.utils.js";
import User from "../modal/userModal.js";

function generateOtp(limit){
   const otp = [];
   for(let i = 0; i < limit; i++){
       const randomNum = Math.floor(Math.random() * 10);
       otp.push(randomNum)
   };
  //  console.log(otp.join('')); 
   return otp.join('') 
}

 class OtpHandler {
  
  constructor(){
    this.savedEmail = null;
  }

    sendOtp = async (req, res) => {
    const {email} = req.body;
       try {

        if(!email){
          return res.status(400).json({msg : 'Please provide an Email'})
        }
        const isUser = await User.findOne({email});
        if(!isUser){
          return res.status(400).json({msg :  "invalid email"})
        }
          const otp = generateOtp(5);
          const newOTP = new otpModal({email, otp});
          await newOTP.save();

          await sendEmail({
            to : email,
            subject : 'Your OTP',
            message : `<p>Your otp is : <strong>${otp}</strong></p>`
          });
        this.savedEmail = email
          return res.status(200).json({msg : 'otp send successfully', userEmail : email })
       } catch (err) {
         console.log('Error in sendOTP (otpHandler) :',err);
         return res.status(500).json({msg : 'Internal server error'})
       }
  };

   verifyOTP = async (req, res) => {
    const {email, otp} = req.body;
    console.log(email, otp);
      try {
        if(!email || !otp){
          return res.status(400).json({msg : 'Invalid Otp'})
        };

        const otpRecord  = await otpModal.findOne({email , otp});

        if(!otpRecord){
          return res.status(400).json({msg : 'Invalid OTP '})
        };

        const otpExpiryMinutes = 10;
        const now = new Date();
        const otpCreatedTime = new Date(otpRecord.createdAt);

        const diffInMinutes = (now - otpCreatedTime) / (1000 * 60);

        if(diffInMinutes > otpExpiryMinutes){
          await otpModal.deleteOne({_id : otpRecord._id});
          return res.status(400).json({msg : 'OTP has expired'})
        };

        await otpModal.deleteOne({_id : otpRecord._id});

        return res.status(200).json({msg : 'OTP verified successfully'})
      } catch (err) {
        console.log('Error in verifyOTP(otphandler) : ', err);
        return res.status(500).json({msg : 'Internal server Error'})
      }
  }
}



const otpHandlerInstance = new OtpHandler()
export default  otpHandlerInstance

