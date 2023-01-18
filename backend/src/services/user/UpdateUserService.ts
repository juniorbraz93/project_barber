import prismaClient from "../../prisma";

interface UserRequest {
  user_id: string | any;
  name: string | any;
  address: string | any;
}

class UpdateUserService {
  async execute({ user_id, name, address } : UserRequest) {
    
    try {

      const userAlreadyExists = await prismaClient.user.findFirst({
        where: {
          id: user_id
        }
      })

      if (!userAlreadyExists) {
        throw new Error('User not exists!')
      }

      const userUpdate= await prismaClient.user.update({
        where: {
          id: user_id
        },
        data: {
          name: name,
          address: address
        },
        select: {
          name: true,
          email: true,
          address: true,
        }
      })

      return userUpdate;

      
    } catch (error) {
      throw new Error('Error an update the user!')
    }

  }
}

export { UpdateUserService }