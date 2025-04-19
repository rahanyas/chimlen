import express from 'express';
import verifytoken from '../middleWare/authMiddleWare.js';
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

router.get('/getUsers', verifytoken, getUsers)

export default router

