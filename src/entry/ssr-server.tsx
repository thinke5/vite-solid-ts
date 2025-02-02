import type { IAyncRoute } from '../routes'
import { assetsForRequest } from '@ssrx/vite/runtime'
import { ayncRouters } from '../routes'
import { HTML } from './html'
import { renderAssets, renderPolyfillAssets } from './ssr-server-utils'

async function render(req: Request, thisRoute?: IAyncRoute) {
  const assets = await assetsForRequest(req.url)
  const routes = await ayncRouters()
  const p = await renderPolyfillAssets()

  const app = () => (
    <HTML
      routes={routes}
      url={req.url}
      headTags={() => (
        <>
          {p}
          {renderAssets(assets.headAssets, thisRoute?.insertStyleToHTML)}
        </>
      )}
      bodyTags={() => renderAssets(assets.bodyAssets, thisRoute?.insertStyleToHTML)}
    />
  )

  return { app }
}

export { ayncRouters, render }
