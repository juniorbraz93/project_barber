import prismaClient from "../../prisma"

class DetailUserService {
  async execute(user_id: string | any) {

    const user = await prismaClient.user.findFirst({
      where:{
        id: user_id
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        subscriptions: {
          select: {
            id:true,
            priceId: true,
            status: true,
          }
        }
      }
    })

    return {data: user}
  }
}

export { DetailUserService }