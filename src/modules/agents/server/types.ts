import { inferRouterOutputs } from '@trpc/server'

import { AppRouter } from '@/trpc/routers/app'

export type AgentGetOne = inferRouterOutputs<AppRouter>['agents']['getOne'] // it return the types of api response
export type AgentGetMany =
  inferRouterOutputs<AppRouter>['agents']['getMany']['items']
