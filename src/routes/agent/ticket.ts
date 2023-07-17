import { Router } from 'express';

import { TicketController } from '../../controllers/ticketController';
import { AuthMiddleware } from '../../middlewares/authMiddleware';
import { CustomValidationMiddleware } from '../../middlewares/customValidationMiddleware';
import {
    SchemaValidator
} from '../../middlewares/validations/schemaValidators';

const schemaValidator: SchemaValidator = new SchemaValidator(true);
// const validateRequest = schemaValidator.validate();
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
        customValidationMiddleware.parseSkipAndLimitAndSortParams,
    ],
    ticketController.listTickets,
);
router.post('/agent/tickets/:id/reply',
    [
        authMiddleware.validateAccessTokenForAgent,
    ],
    ticketController.replyTicket
)
export default router;
