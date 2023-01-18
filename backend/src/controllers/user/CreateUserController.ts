import { Request, Response } from 'express'

import { CreateUserService } from '../../services/user/CreateUserService'

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body

    const createUserServices = new CreateUserService();

    const user = await createUserServices.execute({ name, email, password })

    return response.json(user)
  }
}

export { CreateUserController }