import { Router } from 'express';

import { TicketController } from '../../controllers/ticketController';

const ticketController = new TicketController()


const router: Router = Router();

router.post('/ticket/add', ticketController.addTicket)
router.get('/ticket/tickets',ticketController.listTickets)

export default router;
