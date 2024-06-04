import { Router } from 'express';
import authRouter from './authRoutes';
import todoRouter from './todoRoutes';

const router: Router = Router();


router.use('/user', authRouter);
router.use('/todos', todoRouter);


export default router;

