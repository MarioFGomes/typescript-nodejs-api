import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { CheckSessionIdExists } from '../middlewares/check-session-id-exist'

const prisma = new PrismaClient()
export async function transactionsRoutes(app: FastifyInstance) {
  app.get(
    '/',
    { preHandler: [CheckSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies
      const result = await prisma.transactions.findMany({
        where: {
          session_id: sessionId,
        },
      })
      return { result }
    },
  )

  app.get(
    '/:id',
    { preHandler: [CheckSessionIdExists] },
    async (request, reply) => {
      const getTransactionParamsShema = z.object({
        id: z.string().uuid(),
      })
      const { id } = getTransactionParamsShema.parse(request.params)
      const { sessionId } = request.cookies
      const result = await prisma.transactions.findFirst({
        where: {
          id,
          session_id: sessionId,
        },
      })
      return { result }
    },
  )

  app.get(
    '/summary',
    { preHandler: [CheckSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies
      const result =
        await prisma.$queryRaw`SELECT SUM(amount) FROM transactions where session_id: ${sessionId}`
      return { result }
    },
  )

  app.post('/', async (request, reply) => {
    const transactionShemabody = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = transactionShemabody.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }
    await prisma.transactions.create({
      data: {
        title,
        amount: type === 'credit' ? amount : amount * -1,
        session_id: sessionId,
      },
    })

    return reply.status(201).send()
  })
}
