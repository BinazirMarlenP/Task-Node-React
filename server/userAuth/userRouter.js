import Router from 'express'
import { registration, login, check } from './userController.js'
const router = new Router()
import authMiddleware from '../middleware/authMiddleware.js'


router.post('/registration', registration)
router.post('/login', login)
router.get('/auth', authMiddleware, check
//  (req, res) => {
//     res.json({message: 'Works!!'})
// }
)



export default router