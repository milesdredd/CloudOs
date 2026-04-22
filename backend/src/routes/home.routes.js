
import express from 'express';


import { handleHome } from './../handlers/home.handler.js';

const router = express.Router();
router.get('/', handleHome);

export default router;