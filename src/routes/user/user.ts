import { Router } from 'express';

import { UserController } from '../../controllers/userController';
const userController = new UserController()
import {
  SchemaValidator
} from '../../middlewares/validations/schemaValidators';
import { AuthMiddleware } from '../../middlewares/authMiddleware';

const authMiddleware = new AuthMiddleware()
const schemaValidator: SchemaValidator = new SchemaValidator(true);
const validateRequest = schemaValidator.validate();

const router: Router = Router();

router.post('/user/signup',
  [
    validateRequest
  ],
  userController.signUp
)

router.post('/user/signin',
  [
    validateRequest
  ],
  userController.signIn,
);

router.get('/user/profile',
  [
    authMiddleware.validateAccessToken
  ],
  userController.getProfile,
);

router.patch('/user/profile',
  [
    authMiddleware.validateAccessToken,
    validateRequest,
    
  ],
  userController.updateProfile,
);

export default router;
