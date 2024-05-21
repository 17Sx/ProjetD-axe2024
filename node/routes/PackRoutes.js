import express from 'express';
import { openPack } from '../controllers/PackController.js';

const router = express.Router();

router.post('/open-pack', openPack);

export default router;


