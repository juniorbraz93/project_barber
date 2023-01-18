import { Router, Request, Response } from 'express'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'

import { auth } from './middlewares/auth'
import { UpdateUserController } from './controllers/user/UpdateUserController'

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

export { router }

