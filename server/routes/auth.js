// made this bcz authentication is the key part of an api so it should be separated
import express from 'express';
import { googleAuth, signin, signup } from '../controllers/auth.js';

const router = express.Router()

// Create user
router.post('/signup', signup);
// Login
router.post('/signin', signin);
// verification
router.post('/google', googleAuth);


export default router;