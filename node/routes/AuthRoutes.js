import express from 'express';
import {signup, login, changepassword} from '../controllers/AuthController.js'

const router = express.Router();


router.post('/signup', signup);
router.post('/', login);
router.post('/changepassword', changepassword);

export default router;