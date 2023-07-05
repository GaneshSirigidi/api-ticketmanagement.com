import express, { Request, Response, NextFunction } from 'express';
import ticketRoutes from '../routes/ticket'

const router = express.Router();


router.use('/', ticketRoutes)


/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' });
});

export default router;
