/*
  SPA -- 多页面模式
  相比单页面模式，多页面多了`@solidjs/router`，增加10～20Kb的js体积
*/
import type { RouteDefinition } from '@solidjs/router'
import { HashRouter, Navigate } from '@solidjs/router'
import { lazy } from 'solid-js'
import { Dynamic, render } from 'solid-js/web'
import { KeepAlive, KeepAliveProvider } from '../libs/keepAlive'
import { routerBing } from '../request/test'
import Page404 from './404'

const routes: RouteDefinition[] = [
  {
    path: '/',
    component: () => <Navigate href="/spa" />,
  },
  {
    path: '/spa',
    component: lazy(() => import('../pages/demo/layout')),
    children: [
      {
        path: '/',
        // component: lazy(() => import('../pages/demo')),
        component: () => (<KeepAlive id="spa/demo"><Dynamic component={lazy(() => import('../pages/demo'))} /></KeepAlive>),
      },
      {
        path: '/data',
        component: lazy(() => import('../pages/demo/fetchData')),
        // component: () => (<KeepAlive id="spa/data"><Dynamic component={lazy(() => import('../pages/demo/fetchData'))} /></KeepAlive>),
      },
      {
        path: '/rd',
        component: lazy(() => import('../pages/demo/routerFetch')),
        load: () => routerBing(),
      },
    ],
  },
  {
    path: '/demo',
    component: lazy(() => import('../pages/demo')),
  },
  {
    path: '*any',
    component: Page404,
  },
]
render(() => (
  <KeepAliveProvider>
    <HashRouter>{routes}</HashRouter>
  </KeepAliveProvider>
), document.getElementById('root')!)
