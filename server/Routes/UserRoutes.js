import express from 'express';

import {
  checkUser,
  handleSignup 
  } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', handleSignup);
router.get('/checkAuth', checkUser);

export default router

