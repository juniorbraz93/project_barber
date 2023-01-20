import prismaClient from "../../prisma";

interface FinishSchedule {
  schedule_id: string | any;
  user_id: string | any;
}

class FinishScheduleService {
  async execute({ schedule_id, user_id }: FinishSchedule) {
    if (schedule_id === '' || user_id === '') {
      throw new Error('Error server')
    }

    try {
      const belongsToUser = await prismaClient.service.findFirst({
        where: {
          id: schedule_id,
          user_id: user_id
        }
      })

      if (!belongsToUser) {
        throw new Error('Not authorized')
      }

      await prismaClient.service.delete({
        where: {
          id: schedule_id
        }
      })
     

      return { message: 'Finalizado com sucesso!' }
    } catch (error) {
      console.log(error);
      throw new Error(error)
    }
  }
}

export { FinishScheduleService }