import { Router } from 'express'
import agent from '../agent/agent'

const router: Router = Router()

router.use(agent)


export default router