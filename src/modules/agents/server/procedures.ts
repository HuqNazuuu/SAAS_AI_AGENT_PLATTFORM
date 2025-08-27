import { db } from '@/db'
import { agents, meetings } from '@/db/schema'
import { z } from 'zod'
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from '@/trpc/init'
import { TRPCError } from '@trpc/server'
import { agentsInsertSchema, agentsUpdateSchema } from '../schemas'
import { and, count, desc, eq, getTableColumns, ilike, sql } from 'drizzle-orm'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from '@/constant'

export const agentsRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { search, page, pageSize } = input

      const data = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: db.$count(meetings, eq(agents.id, meetings.agentId)),
        })
        .from(agents)
        .where(
          and(
            eq(agents.userID, ctx.auth.user.id),
            search ? ilike(agents.name, `%${search}%`) : undefined
          )
        )
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize)

      const [total] = await db
        .select({ count: count() })
        .from(agents)
        .where(
          and(
            eq(agents.userID, ctx.auth.user.id),
            search ? ilike(agents.name, `%${search}%`) : undefined
          )
        )

      const totalPages = Math.ceil(total.count / pageSize)
      //await new Promise((resolve) => setTimeout(resolve, 3000))
      //throw new TRPCError({ code: 'BAD_REQUEST' })
      return {
        items: data,
        total: total.count,
        totalPages,
      }
    }),
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [removedAgent] = await db
        .delete(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userID, ctx.auth.user.id))
        )
        .returning()

      if (!removedAgent) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Agent not found' })
      }

      return removedAgent
    }),
  update: protectedProcedure
    .input(agentsUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const [updateAgent] = await db
        .update(agents)
        .set(input)
        .where(
          and(eq(agents.id, input.id), eq(agents.userID, ctx.auth.user.id))
        )
        .returning()

      if (!updateAgent) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Agent not found' })
      }

      return updateAgent
    }),
  //code for getting a single agent by id
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingAgent] = await db
        .select({
          ...getTableColumns,
          meetingCount: db.$count(meetings, eq(agents.id, meetings.agentId)),
        })
        .from(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userID, ctx.auth.user.id))
        )
      if (!existingAgent) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Agent not found' })
      }
      return existingAgent
    }),
  //backend code for creating an agent
  create: premiumProcedure('agents')
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userID: ctx.auth.user.id,
        })
        .returning()
      return createdAgent
    }),
})
