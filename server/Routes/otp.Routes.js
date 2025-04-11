import express from 'express';
const router = express.Router();

import { getotp } from '../controllers/otp.controllers.js';


router.post('/getotp', getotp);

export default router