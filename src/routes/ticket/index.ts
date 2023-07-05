import { Router } from 'express'
import ticket from '../ticket/tickets'

const router: Router = Router()

router.use(ticket)


export default router