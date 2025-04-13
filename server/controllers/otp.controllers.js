import otpModal from "../modal/otpModal.modal.js";
import Randomstring from "randomstring";
import sendEmail from "../utils/sendMail.utils.js";

function generateOtp(){
  return Randomstring.generate({
    length : 5,
    charset : 'numeric'
  });
};

 class OtpHandler {

  async  sendOtp (req, res){
    const {email} = req.body;
       try {

        if(!email){
          return res.status(400).json({msg : 'Please provide an Email'})
        }
          const otp = generateOtp();
          const newOTP = new otpModal({email, otp});
          await newOTP.save();

          await sendEmail({
            to : email,
            subject : 'Your OTP',
            message : `<p>Your otp is : <strong>${otp}</strong></p>`
          });

          return res.status(200).json({msg : 'otp send successfully', userEmail : email })
       } catch (err) {
         console.log('Error in sendOTP (otpHandler) :',err);
         return res.status(500).json({msg : 'Internal server error'})
       }
  };

  async verifyOTP(req, res){
    const {email, otp} = req.body;
    console.log(email, otp);
      try {
        if(!email || !otp){
          return res.status(400).json({msg : 'Email and OTP are required'})
        };

        const otpRecord  = await otpModal.findOne({email , otp});

        if(!otpRecord){
          return res.status(400).json({msg : 'Invalid OTP or Email'})
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

export default new OtpHandler

