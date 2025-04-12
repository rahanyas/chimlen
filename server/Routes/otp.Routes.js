import express from 'express';
const router = express.Router();

import { sendOtp } from '../controllers/otp.controllers.js';


router.post('/getotp', sendOtp);

export default router