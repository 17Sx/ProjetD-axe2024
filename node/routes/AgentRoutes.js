import express from 'express';
import { GetAgents, GetAgent, CreateAgent, UpdateAgent, DeleteAgent } from '../controllers/AgentController.js';

const router = express.Router();

router.get('/', GetAgents);
router.get('/:id', GetAgent);
router.post('/', CreateAgent);
router.put('/:id', UpdateAgent);
router.delete('/:id', DeleteAgent);

export default router;