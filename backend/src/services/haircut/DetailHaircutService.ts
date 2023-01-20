import prismaClient from "../../prisma";

interface Detailhaircut{
  haircut_id: string| any
}

class DetailHaircutService {
  async execute({ haircut_id }: Detailhaircut) {
    const haircut = await prismaClient.haircut.findFirst({
      where: {
        id: haircut_id
      }
    })    

    return haircut
  }
}

export { DetailHaircutService }