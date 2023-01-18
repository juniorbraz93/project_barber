import { Request, Response } from "express"
import { DetailUserService } from "../../services/user/DetailUserService"

class DetailUserController {
  async handle(request: Request, response: Response) {

    const user_id = request.user_id

    const userDetailService = new DetailUserService()

    const userDetail = await userDetailService.execute(user_id)

    return response.json(userDetail)
  }
}

export { DetailUserController }