import express from 'express';

import {
  handleSignup 
  } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', handleSignup);

export default router

