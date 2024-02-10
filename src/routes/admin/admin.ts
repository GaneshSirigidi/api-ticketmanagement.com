import { Router } from 'express';

import { UserController } from '../../controllers/userController';
import { CustomValidationMiddleware } from '../../middlewares/customValidationMiddleware';
import { SchemaValidator } from '../../middlewares/validations/schemaValidators';
import { AuthMiddleware } from '../../middlewares/authMiddleware';
import passportMiddleware from '../../middlewares/passportMiddleware';

const customValidationMiddleware = new CustomValidationMiddleware();
const userController = new UserController()
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

router.post('/admin/agent',
  [
    authMiddleware.validateAccessTokenForAdmin,
    validateRequest,
    customValidationMiddleware.checkEmailExists

  ],
  userController.addAgent,
);

router.delete('/admin/agent/:id',
  [
    authMiddleware.validateAccessTokenForAdmin,

  ],
  userController.delete,
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
    validateRequest

  ],
  userController.updateProfile,
);

router.get('/admin/users',
  [
    authMiddleware.validateAccessTokenForAdmin,
    customValidationMiddleware.parseSkipAndLimitAndSortParams
  ],
  userController.listUsers,
);
router.get('/admin/agents',
  [
    authMiddleware.validateAccessTokenForAdmin,
    customValidationMiddleware.parseSkipAndLimitAndSortParams
  ],
  userController.listAgents,
);
router.patch('/admin/user/status/:id',
  [
    authMiddleware.validateAccessTokenForAdmin,
  ],
  userController.updateUserStatus
)
export default router;
