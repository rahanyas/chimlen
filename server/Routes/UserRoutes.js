import express from 'express';
import verifytoken from '../middleWare/authMiddleWare.js';
import {
  checkUser,
  getUsers,
  handleLogin,
  handleLogout,
  handleSignup,
  } from '../controllers/userController.js';
import newPass from '../controllers/newPass.controller.js'
  

const router = express.Router();

router.post('/signup', handleSignup);
router.get('/checkAuth', checkUser);
router.post('/logout', handleLogout);
router.post('/login', handleLogin);
router.post('/setnewpass', newPass.resetPassword)

router.get('/getUsers', verifytoken, getUsers)

export default router

