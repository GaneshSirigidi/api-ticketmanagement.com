import { Router } from 'express';

import { UserController } from '../../controllers/userController';
const userController = new UserController()
import {
  SchemaValidator
} from '../../middlewares/validations/schemaValidators';

const schemaValidator: SchemaValidator = new SchemaValidator(true);
const validateRequest = schemaValidator.validate();

const router: Router = Router();

router.post('/admin/signup',
  [
    validateRequest
  ], userController.signUp)

router.post('/admin/signin',
  [
    validateRequest
  ],
  userController.signIn,
)

router.post('/admin/agent',
  [
    validateRequest
  ],
  userController.addAgent,
);


export default router;
