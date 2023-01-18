import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string | any;
  email: string | any;
  password: string | any;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!email) {
      throw new Error('Email incorrect')
    }

    const userEmailAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if (userEmailAlreadyExists) {
      throw new Error('Email already exists')
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    })

    return user
  }
}

export { CreateUserService }