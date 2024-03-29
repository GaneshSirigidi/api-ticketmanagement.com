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

// router.post('/agent/tickets',
//     [
//         validateRequest,
//         authMiddleware.validateAccessToken
//     ],
//     ticketController.addTicket
// )

router.get('/agent/tickets/:id',
    [
        authMiddleware.validateAccessTokenForAgent
    ],
    ticketController.getOne
)

router.get('/agent/tickets',
    [
        authMiddleware.validateAccessTokenForAgent,
        validateRequest,
        customValidationMiddleware.parseSkipAndLimitAndSortParams,
    ],
    ticketController.listTickets,
);
router.post('/agent/tickets/:id/reply',
    [
        validateRequest,
        authMiddleware.validateAccessTokenForAgent,
    ],
    ticketController.replyTicket
)

router.post('/agent/ticket/:id/download',

    [
        authMiddleware.validateAccessTokenForAgent,
        validateRequest

    ], ticketController.downloadProof)

router.post('/agent/tickets/:id/reply-proof',
    [
        authMiddleware.validateAccessTokenForAgent,
        validateRequest,
    ],
    ticketController.replyTicketWithImage
)

router.post('/agent/tickets/:id/main-reply',
    [
        authMiddleware.validateAccessTokenForAgent,
        validateRequest,
    ],
    ticketController.mainReply
)


export default router;
