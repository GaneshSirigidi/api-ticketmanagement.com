import { Router } from 'express';

import { UserController } from '../../controllers/userController';
const userController = new UserController()
import {
  SchemaValidator
} from '../../middlewares/validations/schemaValidators';
import { AuthMiddleware } from '../../middlewares/authMiddleware';

const authMiddleware= new AuthMiddleware()
const schemaValidator: SchemaValidator = new SchemaValidator(true);
const validateRequest = schemaValidator.validate();

const router: Router = Router();

// router.post('/user/signup',
//   [
//     validateRequest
//   ], userController.signUp)

router.post('/agent/signin',
  [
    validateRequest
  ],
  userController.signIn,
);

router.get('/agent/profile',
  [
    authMiddleware.validateAccessTokenForAgent
  ],
  userController.getProfile,
);

router.patch('/agent/profile',
  [
    authMiddleware.validateAccessTokenForAgent,
    validateRequest,
    
  ],
  userController.updateProfile,
);


export default router;
