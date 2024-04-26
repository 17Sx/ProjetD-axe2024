import express from 'express';
import { GetIOTs, AddIOT , GetIOT , DeleteIOT , UpdateIOT , GetHouse} from '../controllers/IOTController.js';
const router = express.Router();

//router.get('/', GetIOTs);
// router.post('/', AddIOT);  
//router.get('/:id', GetIOT);
router.put('/:id', UpdateIOT);
router.delete('/:id', DeleteIOT);
router.get('/house', GetHouse);


export default router;

