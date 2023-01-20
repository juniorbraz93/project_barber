import { Request, Response } from "express";
import { UpdateHaircutService } from "../../services/haircut/UpdateHaircutService";


class UpdateHaircutController {
  async handle( request: Request, response: Response ) {
    const { name, price, status, haircut_id } = request.body
    const user_id = request.user_id

    const updateHaircutService = new UpdateHaircutService()

    const haircut = await updateHaircutService.execute({ user_id, haircut_id, name, price, status })


    return response.json(haircut)
  }
}

export { UpdateHaircutController }