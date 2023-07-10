import { Router } from 'express';

import { TicketController } from '../../controllers/ticketController';
import { AuthMiddleware } from '../../middlewares/authMiddleware';

const ticketController = new TicketController()
const authMiddleware = new AuthMiddleware()

const router: Router = Router();

router.post('/tickets',
    [
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
