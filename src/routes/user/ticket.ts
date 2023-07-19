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
        authMiddleware.validateAccessToken
    ],
    ticketController.addTicket
)
router.patch('/user/tickets/:id',
    [
        validateRequest,
        authMiddleware.validateAccessToken
    ],
    ticketController.updateTicket
)

router.get('/user/tickets/:id',
    [
        authMiddleware.validateAccessToken
    ],
    ticketController.getOne
)

router.get('/user/tickets',
    [
        authMiddleware.validateAccessToken,
        customValidationMiddleware.parseSkipAndLimitAndSortParams,
       
    ],
    ticketController.listTickets
)

router.get('/user/tickets/:id/threads',
    [
        authMiddleware.validateAccessToken
    ],
    ticketController.getThreads
)


export default router;
