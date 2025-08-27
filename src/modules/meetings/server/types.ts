import { inferRouterOutputs } from '@trpc/server'

import { AppRouter } from '@/trpc/routers/app'

export type MeetingGetOne = inferRouterOutputs<AppRouter>['meetings']['getOne'] // it return the types of api response
export type MeetingGetMany =
  inferRouterOutputs<AppRouter>['meetings']['getMany']['items']

export enum MeetingStatus {
  Upcoming = 'upcoming',
  Active = 'active',
  Completed = 'completed',
  Processing = 'processing',
  Cancelled = 'cancelled',
}

export type StreamTranscriptItem = {
  speaker_id: string
  type: string
  text: string
  start_ts: number
  stop_ts: number
}
