import express from 'express';
const router = express.Router();
import { handleSignIn, handleSignUp, handleToken } from '../controller/auth.controller.js';
import { handleTokenMiddleware } from '../middleware/auth.middleware.js';
console.log("redirected to auth route... ");


router.post('/signIn', handleSignIn);
router.post('/signUp', handleSignUp);
router.get('/token', handleTokenMiddleware, handleToken);

export default router;