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

// router.post('/admin/tickets',
//     [
//         validateRequest,
//         authMiddleware.validateAccessToken
//     ],
//     ticketController.addTicket)

router.get('/admin/tickets',
    [
        authMiddleware.validateAccessTokenForAdmin
    ],
    ticketController.listTickets)

router.get('/admin/tickets/:id',
    [
        authMiddleware.validateAccessToken
    ],
    ticketController.getThreads)


router.post('/admin/tickets/:id/reply',
    [
        authMiddleware.validateAccessToken
    ],
    ticketController.replyTicket)

export default router;