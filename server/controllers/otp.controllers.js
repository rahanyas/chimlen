import otpModal from "../modal/otpModal.modal.js";
import Randomstring from "randomstring";
import sendEmail from "../utils/sendMail.utils.js";

function generateOtp(){
  return Randomstring.generate({
    length : 6,
    charset : 'numeric'
  });
};


export const sendOtp =  async (req, res) => {
  const {email} = req.body;
    try {
      const otp = generateOtp();
      // console.log(otp)
      const newOTP = new otpModal({email ,  otp});
      await newOTP.save();

      await sendEmail({
        to : email,
        subject : 'yout OTP',
        message : `<p>your otp is : <strong>${otp}</strong></p>`
      });

      return res.status(200).json({msg : 'otp send successfully'});
    } catch (err) {
      console.log('error in getotp : ',err);
      return res.status(500).json({msg : 'internal server error'})
    }
}