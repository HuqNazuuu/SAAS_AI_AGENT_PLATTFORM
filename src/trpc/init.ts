import { db } from '@/db'
import { agents, meetings } from '@/db/schema'
import { auth } from '@/lib/auth'
import { polarClient } from '@/lib/polar'
import { MAX_FREE_AGENTS, MAX_FREE_MEETINGS } from '@/modules/premium/constant'
import { initTRPC, TRPCError } from '@trpc/server'
import { count, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { cache } from 'react'
export const createTRPCContext = cache(async () => {
  return { userId: 'user_123' }
})

const t = initTRPC.create({})
// Base router and procedure helpers
export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure // ./trpc/routers/app.ts -->backend function
//auth based protected procedure
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
  }
  return next({ ctx: { ...ctx, auth: session } })
})

export const premiumProcedure = (entity: 'meetings' | 'agents') =>
  protectedProcedure.use(async ({ ctx, next }) => {
    const customer = await polarClient.customers.getStateExternal({
      externalId: ctx.auth.user.id,
    })
    const [userMeeting] = await db
      .select({ count: count(meetings.id) })
      .from(meetings)
      .where(eq(meetings.userId, ctx.auth.user.id))

    const [userAgents] = await db
      .select({ count: count(agents.id) })
      .from(agents)
      .where(eq(agents.userID, ctx.auth.user.id))

    const isPremium = customer.activeSubscriptions.length > 0
    const isFreeAgentsLimitReached = userAgents.count >= MAX_FREE_AGENTS
    const isFreeMeetingsLimitReached = userMeeting.count >= MAX_FREE_MEETINGS

    const shouldThrowMeetingError =
      entity === 'meetings' && isFreeMeetingsLimitReached && !isPremium
    const shouldThrowAgentsError =
      entity === 'agents' && isFreeAgentsLimitReached && !isPremium

    if (shouldThrowMeetingError) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You have reached the maximum number of free meetings',
      })
    }
    if (shouldThrowAgentsError) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You have reached the maximum number of free agents',
      })
    }
    return next({ ctx: { ...ctx, customer } })
  })
