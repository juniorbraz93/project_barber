import prismaClient from "../../prisma";

interface CountRequest{
  user_id: string | any
}

class CountHaircutsService {
  async execute({ user_id }:  CountRequest) {

    const count = prismaClient.haircut.count({
      where: {
        user_id: user_id
      }
    })

    return count
  }
}

export { CountHaircutsService }