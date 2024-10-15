import type { IAyncRoute } from '../routes'
import { ayncRouters } from '../routes'

// eslint-disable-next-line antfu/no-top-level-await
export const routes = await ayncRouters()
export type { IAyncRoute }
