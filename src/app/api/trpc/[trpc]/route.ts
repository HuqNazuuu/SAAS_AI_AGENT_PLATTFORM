import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { createTRPCContext } from '@/trpc/init'
import { AppRouter } from '@/trpc/routers/app'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: AppRouter,
    createContext: createTRPCContext,
  })
export { handler as GET, handler as POST }
