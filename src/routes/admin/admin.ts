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

router.post('/admin/signup',
  [
    validateRequest
  ],
  userController.signUp
)

router.post('/admin/signin',
  [
    validateRequest
  ],
  userController.signIn,
)

router.post('/admin/agent',
  [
    authMiddleware.validateAccessTokenForAdmin,
    validateRequest
    
  ],
  userController.addAgent,
);

router.get('/admin/profile',
  [
    authMiddleware.validateAccessTokenForAdmin
  ],
  userController.getProfile,
);

router.patch('/admin/profile',
  [
    authMiddleware.validateAccessTokenForAdmin,
    validateRequest
    
  ],
  userController.updateProfile,
);

router.get('/admin/users',
  [
    authMiddleware.validateAccessTokenForAdmin
  ],
  userController.listUsersByUserType,
);


export default router;
