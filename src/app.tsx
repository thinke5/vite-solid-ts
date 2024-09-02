import './app.less'
import 'uno.css'
import type { RouteDefinition } from '@solidjs/router'
import { Router } from '@solidjs/router'
import { Suspense } from 'solid-js'
import { MetaProvider, Title } from '@solidjs/meta'
import { BUILD_TIME, BUILD_V } from './config'
import { KeepAliveProvider } from '~/libs/keepAlive'

//  eslint-disable-next-line no-console
console.log(`%c ${BUILD_V} bulid in ${BUILD_TIME} `, 'background:#4a0;color:#fff;padding:6px;') // 打印版本

/** mian */
export default function App(props: { url?: string, routes: RouteDefinition[] }) {
  return (
    <KeepAliveProvider>
      <MetaProvider>
        <Title>VITE + Solid + SPA</Title>
        <Router
          url={props.url}
          root={props => (
            <div class="root-content">
              <Suspense fallback={<span>loading...</span>}>
                {props.children}
              </Suspense>
            </div>
          )}
        >
          {props.routes}
        </Router>
      </MetaProvider>
    </KeepAliveProvider>
  )
};
