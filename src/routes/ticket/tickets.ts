import { Router } from 'express';

import { TicketController } from '../../controllers/ticketController';
import { AuthMiddleware } from '../../middlewares/authMiddleware';

const ticketController = new TicketController()
const authMiddleware= new AuthMiddleware()

const router: Router = Router();

router.post('/ticket/add',
    [
        authMiddleware.validateAccessToken
    ],
     ticketController.addTicket)

router.get('/ticket/tickets',
    [
        authMiddleware.validateAccessTokenForAdmin
    ],  
     ticketController.listTickets)  

router.post('/ticket/reply/:id',
    [
        authMiddleware.validateAccessToken
    ],
     ticketController.replyTicket)

export default router;
