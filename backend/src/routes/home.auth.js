import express from 'express';
const router = express.Router();
import { handleSignIn, handleSignUp, handleToken } from '../controller/auth.controller.js';
console.log("redirected to auth route... ");


router.post('/signIn', handleSignIn);
router.post('/signUp', handleSignUp);
router.post('/token', handleToken);

export default router;