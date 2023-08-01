import { Router } from 'express';

import { TicketController } from '../../controllers/ticketController';
import { AuthMiddleware } from '../../middlewares/authMiddleware';
import { SchemaValidator } from '../../middlewares/validations/schemaValidators';
import { CustomValidationMiddleware } from '../../middlewares/customValidationMiddleware';

const customValidationMiddleware = new CustomValidationMiddleware()
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
        validateRequest,
        customValidationMiddleware.parseSkipAndLimitAndSortParams,

    ],
    ticketController.listTickets
)

router.post('/user/tickets/:id/reply',
    [
        validateRequest,
        authMiddleware.validateAccessToken
    ],
    ticketController.replyTicket
)
router.post('/user/tickets/:id/reply-proof',
    [
        validateRequest,
        authMiddleware.validateAccessToken
    ],
    ticketController.replyTicketWithImage
)


router.get('/user/tickets/:id/threads',
    [
        authMiddleware.validateAccessToken
    ],
    ticketController.getThreads
)

router.get('/user/threads/:id',
    [
        authMiddleware.validateAccessToken
    ],
    ticketController.getThread
)

router.post('/user/ticket/:id/proof',
    [
        authMiddleware.validateAccessToken,
        validateRequest

    ], ticketController.updateProof)

router.post('/user/thread/:id/proof',
    [
        authMiddleware.validateAccessToken,
        validateRequest

    ], ticketController.updateProofInThreads)

router.post('/user/ticket/:id/download',

    [
        authMiddleware.validateAccessToken,
        validateRequest

    ], ticketController.downloadProof)

router.post('/user/threads/:id/download',
    [
        authMiddleware.validateAccessToken,
        validateRequest

    ], ticketController.downloadProofInThreads)

router.delete('/user/ticket/:id/proof',
    [
        authMiddleware.validateAccessToken,
        validateRequest
    ], ticketController.deleteProof)




export default router;
