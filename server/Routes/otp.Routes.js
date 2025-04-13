import express from 'express';
import  OtpHandler  from '../controllers/otp.controllers.js';
const router = express.Router();

// import { sendOtp } from '../controllers/otp.controllers.js';



router.post('/getotp', OtpHandler.sendOtp);
router.post('/verifyOtp', OtpHandler.verifyOTP);
export default router