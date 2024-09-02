import type { IAyncRoute } from '../routes'
import { ayncRouters } from '../routes'

export const routes = await ayncRouters()
export type { IAyncRoute }
