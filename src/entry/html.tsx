import type { RouteDefinition } from '@solidjs/router'
import type { JSX } from 'solid-js'
import { ErrorBoundary, HydrationScript, NoHydration } from 'solid-js/web'
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
    <html lang="zh">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover" />
        <NoHydration>
          {props.headTags?.()}

          <HydrationScript />
          <meta name="xx" content="xx" />
        </NoHydration>
        <meta name="xx" content="yy" />
      </head>

      <body>
        <div id="root">
          <ErrorBoundary fallback={(error) => {
            console.log('ErrorBoundary error =>\n', error)

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
