import { Request, Response } from "express";
import { CheckSubscruiptionService } from "../../services/user/CheckSubscruiptionService";

class CheckSubscriptionController {
  async handle(request: Request, response: Response) {
    const user_id = request.user_id

    const checkSubscruiptionService = new CheckSubscruiptionService()

    const userStatus = await checkSubscruiptionService.execute({ user_id })

    return response.json(userStatus)
  }
}

export { CheckSubscriptionController }