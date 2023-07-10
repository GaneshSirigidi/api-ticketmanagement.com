import express, { Request, Response, NextFunction } from 'express';
import adminRoutes from '../routes/admin'
import userRoutes from '../routes/user'
import agentRoutes from '../routes/agent'

const router = express.Router();


router.use('/', adminRoutes)
router.use('/', userRoutes)
router.use('/',agentRoutes)


/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' });
});

export default router;
