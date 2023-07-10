import { Router } from 'express';

import { UserController } from '../../controllers/userController';
const userController = new UserController()
import {
  SchemaValidator
} from '../../middlewares/validations/schemaValidators';

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


export default router;
