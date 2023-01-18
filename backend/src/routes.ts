import { Router, Request, Response } from 'express'

import { CreateUserController } from './controllers/user/CreateUserController'

const router = Router()

// --- Rota de Teste

router.get('/teste', (req: Request, res: Response) => {
    return res.json({ok: true})
  })

// --- Rotas User ---

router.post('/users', new CreateUserController().handle)

export { router }

