import prismaClient from "../../prisma";

interface NewSchedule{
  user_id: string | any;
  haircut_id:  string | any;
  customer: string  | any;
}

class NewScheduleService {
  async execute({ user_id, haircut_id, customer }: NewSchedule) {
    if (customer === '' || haircut_id === '' ) {
      throw new Error('Customer or Haircut Invalid')
    }

    const newSchedule = await prismaClient.service.create({
      data: {
        user_id: user_id,
        haircut_id: haircut_id,
        customer: customer
      }
    })

    return newSchedule
  }
}

export { NewScheduleService }