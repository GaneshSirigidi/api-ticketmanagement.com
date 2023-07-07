import express, { Request, Response, NextFunction } from 'express';
import ticketRoutes from '../routes/ticket'
import userRoutes from '../routes/user'

const router = express.Router();


router.use('/', ticketRoutes)
router.use('/',userRoutes)


/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' });
});

export default router;
