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

router.post('/tickets',
    [
        validateRequest,
        authMiddleware.validateAccessToken
    ],
    ticketController.addTicket)

router.get('/tickets',
    [
        authMiddleware.validateAccessToken
    ],
    ticketController.listTickets)

router.get('/tickets/:id',
    [
        authMiddleware.validateAccessToken
    ],
    ticketController.getTicketReplies)


router.post('/tickets/:id/reply',
    [
        authMiddleware.validateAccessToken
    ],
    ticketController.replyTicket)

export default router;
