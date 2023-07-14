import { Router } from 'express';

import { TicketController } from '../../controllers/ticketController';
import { AuthMiddleware } from '../../middlewares/authMiddleware';
import { SchemaValidator} from '../../middlewares/validations/schemaValidators';
import { CustomValidationMiddleware } from '../../middlewares/customValidationMiddleware';

const customValidationMiddleware= new CustomValidationMiddleware()
const schemaValidator: SchemaValidator = new SchemaValidator(true);
const validateRequest = schemaValidator.validate();

const ticketController = new TicketController()
const authMiddleware = new AuthMiddleware()

const router: Router = Router();

router.post('/user/tickets',
    [
        validateRequest,
        authMiddleware.validateAccessTokenForUser
    ],
    ticketController.addTicket
)
router.patch('/user/tickets/:id',
    [
        validateRequest,
        authMiddleware.validateAccessTokenForUser
    ],
    ticketController.updateTicket
)

router.get('/user/tickets/:id',
    [
        authMiddleware.validateAccessTokenForUser
    ],
    ticketController.getOne
)

router.get('/user/tickets',
    [
        authMiddleware.validateAccessTokenForUser,
        validateRequest,
        customValidationMiddleware.parseSkipAndLimitAndSortParams,
       
    ],
    ticketController.listUserTickets
)

router.get('/user/tickets/:id/threads',
    [
        authMiddleware.validateAccessTokenForUser
    ],
    ticketController.getThreads
)


export default router;
