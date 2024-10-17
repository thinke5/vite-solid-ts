import type { RouteDefinition } from '@solidjs/router'
import type { JSX } from 'solid-js'
import { ErrorBoundary, HydrationScript, NoHydration } from 'solid-js/web'
import { errorLog, reportEvent } from '~/libs/TAM'
import App from '../app'

interface AppProps {
  url?: string
  headTags?: () => JSX.Element
  bodyTags?: () => JSX.Element
  routes: RouteDefinition[]
}
/** HTML 模版 */
export function HTML(props: AppProps) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover" />
        <NoHydration>
          {props.headTags?.()}

          <HydrationScript />
          {/* TAM监控 */}
          {/* <script type="text/javascript" src="https://tam.cdn-go.cn/aegis-sdk/latest/aegis.min.js" crossorigin="anonymous"></script>
          <script>
            {`window.$$tam_aegis = new window.Aegis(${JSON.stringify({
              id: 'pGUVFTCZyewxxxxx', // 项目上报id
              uin: 'xxx', // 用户唯一标识（可选）
              reportApiSpeed: true, // 接口测速
              reportAssetSpeed: true, // 静态资源测速
              spa: true, // spa 页面需要开启，页面切换的时候上报pv
            })});`}
          </script> */}

        </NoHydration>
      </head>

      <body>
        <div id="root">
          <ErrorBoundary fallback={(error) => {
            console.log('ErrorBoundary error =>\n', error)

            reportEvent(`捕获错误`, error.message)
            errorLog(error)
            return <span>error</span>
          }}
          >
            <App url={props.url} routes={props.routes} />
          </ErrorBoundary>
        </div>
        <NoHydration>{props.bodyTags?.()}</NoHydration>
        {/* todo:vConsole */}
      </body>
    </html>
  )
}
