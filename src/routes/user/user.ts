import { Router } from 'express';

import { UserController } from '../../controllers/userController';
const userController = new UserController()
import {
  SchemaValidator
} from '../../middlewares/validations/schemaValidators';
import { AuthMiddleware } from '../../middlewares/authMiddleware';
import passportMiddleware from '../../middlewares/passportMiddleware';
import { CustomValidationMiddleware } from '../../middlewares/customValidationMiddleware';

const customValidationMiddleware = new CustomValidationMiddleware();
const authMiddleware = new AuthMiddleware()
const schemaValidator: SchemaValidator = new SchemaValidator(true);
const validateRequest = schemaValidator.validate();

const router: Router = Router();

router.post('/user/signup',
  [
    validateRequest,
    customValidationMiddleware.checkEmailExists
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

router.get('/profile',
  [
    authMiddleware.validateAccessToken
  ],
  userController.getProfile,
);

router.patch('/profile',
  [
    authMiddleware.validateAccessToken,
    validateRequest,

  ],
  userController.updateProfile,
);

router.post('/forgot-password',
  [
    validateRequest,
  ],
  userController.forgotPassword
)
router.patch('/reset-password',
  [
    validateRequest,
  ], userController.resetPassword)

router.post('/user/pre-signed-url',
  [
    authMiddleware.validateAccessToken,
    validateRequest

  ], userController.getSignedUrl)


export default router;
