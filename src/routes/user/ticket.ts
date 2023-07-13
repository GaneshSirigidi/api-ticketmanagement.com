import { Router } from 'express';

import { TicketController } from '../../controllers/ticketController';
import { AuthMiddleware } from '../../middlewares/authMiddleware';
import {
    SchemaValidator
} from '../../middlewares/validations/schemaValidators';

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

router.get('/user/ticket',
    [
        authMiddleware.validateAccessTokenForUser
    ],
    ticketController.getOne
)

router.get('/user/tickets',
    [
        authMiddleware.validateAccessTokenForUser
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
