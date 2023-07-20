import { Router } from 'express';

import { TicketController } from '../../controllers/ticketController';
import { AuthMiddleware } from '../../middlewares/authMiddleware';
import { CustomValidationMiddleware } from '../../middlewares/customValidationMiddleware';
import {
    SchemaValidator
} from '../../middlewares/validations/schemaValidators';

const schemaValidator: SchemaValidator = new SchemaValidator(true);
const validateRequest = schemaValidator.validate();

const customValidationMiddleware = new CustomValidationMiddleware();
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
        authMiddleware.validateAccessTokenForAdmin,
        customValidationMiddleware.parseSkipAndLimitAndSortParams,
    ],
    ticketController.listTickets
)

router.get('/admin/ticket/:id',
    [
        authMiddleware.validateAccessTokenForAdmin
    ],
    ticketController.getOne
)

router.patch('/admin/tickets/:id/assigned-to',
    [
        authMiddleware.validateAccessTokenForAdmin
    ],
    ticketController.assignTicket
)

router.post('/admin/tickets/:id/reply',
    [
        validateRequest,
        authMiddleware.validateAccessTokenForAdmin
    ],
    ticketController.replyTicket
)

router.get('/admin/tickets/:id/threads',
    [
        authMiddleware.validateAccessTokenForAdmin
    ],
    ticketController.getThreads
)

router.get('/admin/tickets-statistics',
    [
        authMiddleware.validateAccessTokenForAdmin
    ],
    ticketController.ticketsStatistics
)

router.delete('/admin/ticket/:id',
    [
        authMiddleware.validateAccessTokenForAdmin

    ], ticketController.delete)

router.patch('/admin/tickets/:id',
    [
        validateRequest,
        authMiddleware.validateAccessTokenForAdmin

    ], ticketController.updateStatus)
    
router.get('/admin/agent/:id/tickets',
    [
        validateRequest,
        authMiddleware.validateAccessTokenForAdmin
],ticketController.getAgentTickets)

export default router;
