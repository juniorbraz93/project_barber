import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

interface AuthUserRquest {
  email: String | any;
  password: String | any;
}

class AuthUserService {
  async execute({ email, password }: AuthUserRquest) {
    
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      },
      include: {
        subscriptions: true,
      }
    })

    if (!user) {
      throw new Error('Email or password incorrect')
    }

    const passwordMatch = await compare( password, user?.password)

    if (!passwordMatch) {
      throw new Error('Email or password incorrect')
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,

      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )

    
    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      address: user?.address,
      token: token,
      subscriptions: user.subscriptions ? {
        id: user?.subscriptions?.id,
        status: user?.subscriptions?.status,
      } : null
    }
  }
}

export { AuthUserService }