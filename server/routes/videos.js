import express from 'express';
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from '../controllers/video.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// Create

router.post('/', verifyToken, addVideo)

// Update

router.put('/:id', verifyToken, updateVideo)

// Delete

router.delete('/:id', verifyToken, deleteVideo)

// Get

router.get('/find/:id', getVideo)

// adding view to video after it is clicked

router.get('/view/:id', addView)

// displaying trending videos

router.get('/trend', trend)

// displaying random videos

router.get('/random', random)

// displaying subscribed channel's videos

router.get('/sub', verifyToken, sub)

// search by tags

router.get('/tags', getByTag)

// search by titles

router.get('/search', search)

export default router;