import express from 'express';
import agents from './routes/AgentRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import IOTRoutes from './routes/IOTRoutes.js';
import PackRoutes from './routes/PackRoutes.js';
import FavRoutes from './routes/FavRoutes.js';


const router = express.Router();


router.use('/agents', agents);
router.use('/auth', AuthRoutes);
router.use('/users', UserRoutes);
router.use('/iot', IOTRoutes);
router.use('/ovrt', PackRoutes);
router.use('/favcards', FavRoutes);


export default router;