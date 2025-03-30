import express from 'express';

import {
  checkUser,
  handleLogin,
  handleLogout,
  handleSignup 
  } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', handleSignup);
router.get('/checkAuth', checkUser);
router.post('/logout', handleLogout);
router.post('/login', handleLogin);

export default router

