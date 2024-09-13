import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const todo1 = await prisma.todo.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      task: 'Levar o cachorro no parque',
      complete: false,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
