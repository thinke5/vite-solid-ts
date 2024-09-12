import { ayncRouters } from '../routes'
import type { IAyncRoute } from '../routes'

export const routes = await ayncRouters()
export type { IAyncRoute }
