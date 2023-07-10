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

export default router;
