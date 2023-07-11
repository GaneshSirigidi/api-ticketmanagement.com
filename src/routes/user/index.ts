import { Router } from 'express'
import user from './user'
import ticket from './ticket'

const router: Router = Router()

router.use(user)
router.use(ticket)

export default router