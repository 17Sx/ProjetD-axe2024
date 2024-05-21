import express from 'express';
import { GetUsers } from '../controllers/UserController.js';
import { AddToInventory, getInventory } from '../controllers/UserController.js';

const router = express.Router();

router.get('/', GetUsers);
router.post('/:id/inventory', AddToInventory);
router.get('/:id/inventory', getInventory);

export default router;
