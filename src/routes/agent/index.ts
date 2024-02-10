import { Router } from 'express'
import agent from '../agent/agent'
import ticket from '../agent/ticket'

const router: Router = Router()

router.use(agent)
router.use(ticket)


export default router