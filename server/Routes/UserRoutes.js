import express from 'express';

import {
  checkUser,
  getUsers,
  handleLogin,
  handleLogout,
  handleSignup 
  } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', handleSignup);
router.get('/checkAuth', checkUser);
router.post('/logout', handleLogout);
router.post('/login', handleLogin);

router.get('/getUsers', getUsers)

export default router

