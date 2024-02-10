import { Router } from 'express'
import ticket from '../admin/ticket'
import admin from '../admin/admin'

const router: Router = Router()


router.use(ticket)
router.use(admin)


export default router