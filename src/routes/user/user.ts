import { Router } from 'express';

import { UserController } from '../../controllers/userController';

const userController = new UserController()


const router: Router = Router();

router.post('/signup', userController.signUp)
router.post('/signin',userController.signIn,
  );


export default router;
