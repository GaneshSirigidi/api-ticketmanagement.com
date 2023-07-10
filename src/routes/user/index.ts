import { Router } from 'express'
import user from '../user/user'
import ticket from '../user/ticket'

const router: Router = Router()

router.use(user)
router.use(ticket)

export default router