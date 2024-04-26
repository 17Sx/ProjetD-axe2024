import express from 'express';
import { GetUsers } from '../controllers/UserController.js';
import { AddToInventory, getInventory } from '../controllers/UserController.js';
const router = express.Router();


router.get('/', GetUsers);
router.post('/users/:id/inventory',AddToInventory);
router.get('/users/:id/inventory', getInventory);

export default router;