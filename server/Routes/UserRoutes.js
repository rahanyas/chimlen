import express from 'express';

import {
  checkUser,
  handleLogout,
  handleSignup 
  } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', handleSignup);
router.get('/checkAuth', checkUser);
router.post('/logout', handleLogout)

export default router

