import { assetsForRequest } from '@ssrx/vite/runtime'
import { ayncRouters } from '../routes'
import { HTML } from './html'
import { renderAssets } from './ssr-server-utils'
import type { IAyncRoute } from '../routes'

async function render(req: Request, thisRoute?: IAyncRoute) {
  const assets = await assetsForRequest(req.url)
  const routes = await ayncRouters()

  const app = () => (
    <HTML
      routes={routes}
      url={req.url}
      headTags={() => renderAssets(assets.headAssets, thisRoute?.insertStyleToHTML)}
      bodyTags={() => renderAssets(assets.bodyAssets, thisRoute?.insertStyleToHTML)}
    />
  )

  return { app }
}

export { ayncRouters, render }
