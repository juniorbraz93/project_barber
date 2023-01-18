import { Request, Response } from 'express'

import { CreateUserServices } from '../../services/user/CreateUserServices'

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body

    const createUserServices = new CreateUserServices();

    const user = await createUserServices.execute({ name, email, password })

    return response.json(user)
  }
}

export { CreateUserController }