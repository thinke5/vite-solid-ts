import { MetaProvider, Title } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { Suspense } from 'solid-js'
import type { RouteDefinition } from '@solidjs/router'
import { KeepAliveProvider } from '~/libs/keepAlive'
import { BUILD_TIME, BUILD_V, RouteBasePah } from './config'
import PageSpy from './libs/pageSpy'
import SolidQuery from './libs/solid-query'
import VConsole from './libs/vConsole'
import './app.less'
import 'uno.css'

//  eslint-disable-next-line no-console
console.log(`%c ${BUILD_V} bulid in ${BUILD_TIME} `, 'background:#4a0;color:#fff;padding:6px;') // 打印版本

/** mian */
export default function App(props: { url?: string, routes: RouteDefinition[] }) {
  return (
    <SolidQuery>
      <KeepAliveProvider>
        <MetaProvider>
          <Title>VITE + Solid + SPA</Title>
          <VConsole />
          <PageSpy />
          <Router
            base={RouteBasePah}
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
    </SolidQuery>
  )
};
