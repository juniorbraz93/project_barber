import prismaClient from "../../prisma";

interface ListSchedule{
  user_id: string
}

class ListScheduleService {
  async execute({ user_id }: ListSchedule) {

    const schedule = await prismaClient.service.findMany({
      where: {
        user_id: user_id
      },
      select: {
        id: true,
        customer: true,
        haircut: true
      }      
    })

    return schedule
  }
  
}

export { ListScheduleService }