import { Router } from 'express';

import { UserController } from '../../controllers/userController';
const userController = new UserController()
import {
  SchemaValidator
} from '../../middlewares/validations/schemaValidators';
import { AuthMiddleware } from '../../middlewares/authMiddleware';
import passportMiddleware from '../../middlewares/passportMiddleware';
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

router.post('/signin',
passportMiddleware.authenticate('signin', {
  session: false,
  failWithError: true,
}),
  [
    validateRequest
  ],
  userController.signIn,
  (err, req, res, next) => {
    const respData = {
      success: false,
      message: 'Invalid Credentials!',
    };
    return res.status(err.status).json(respData);
  }
);

router.get('/user/profile',
  [
    authMiddleware.validateAccessTokenForUser
  ],
  userController.getProfile,
);

router.patch('/user/profile',
  [
    authMiddleware.validateAccessTokenForUser,
    validateRequest,
    
  ],
  userController.updateProfile,
);

router.post('/user/pre-signed-url',
  [
    authMiddleware.validateAccessTokenForUser,
    validateRequest

  ], userController.getSignedUrl)


export default router;
