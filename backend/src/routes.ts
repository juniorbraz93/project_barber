import { Router, Request, Response } from 'express'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'

import { auth } from './middlewares/auth'
import { UpdateUserController } from './controllers/user/UpdateUserController'
import { CreateHaircutController } from './controllers/haircut/CreateHaircutController'
import { ListHaircutController } from './controllers/haircut/ListHaircutController'
import { UpdateHaircutController } from './controllers/haircut/UpdateHaircutController'
import { CheckSubscriptionController } from './controllers/user/CheckSubscriptionController'

const router = Router()

// --- Rota de Teste

router.get('/teste', (req: Request, res: Response) => {
    return res.json({ok: true})
  })

// --- Rotas User ---

router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/current', auth, new DetailUserController().handle)
router.put('/update', auth, new UpdateUserController().handle)
router.get('/check', auth, new CheckSubscriptionController().handle)

// --- Rotas Haircut

router.post('/haircut', auth, new CreateHaircutController().handle)
router.get('/haircuts', auth, new ListHaircutController().handle)
router.put('/haircut', auth, new UpdateHaircutController().handle)


export { router }

