import { PrismaClient } from '@prisma/client'

export interface Context {
  prisma: PrismaClient,
  currentUser: any,
}

const prisma = new PrismaClient()

async function getUser(authToken: String): any {
  return await prisma.user.findFirst();
}

export const createContext = async (ctx: any): Context => {
  const token: String = ctx.req.headers.Authorization || '';
  const currentUser = await getUser(token);
  
  console.log('user is', currentUser)
  return {
    currentUser: currentUser,
    prisma,
  }
}
