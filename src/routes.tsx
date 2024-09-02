import type { RouteDefinition } from '@solidjs/router'
import { lazy } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { lazyCom } from './entry/ssr-utils'
import { KeepAlive } from './libs/keepAlive'
import Page404 from './pages/404'

export interface IAyncRoute extends RouteDefinition {
  /** 打开会尝试加载 `Suspense` 的异步内容，包括异步组件、请求 @default false */
  async?: boolean
  /**
   * 打开会将css直接嵌入HTML
   *
   * ⚠️注意：这可能会影响html的加载速度
   * @default false
   */
  insertStyleToHTML?: boolean
}

export async function ayncRouters() {
  return [
    {
      // async: true,
      insertStyleToHTML: true,
      path: '/',
      component: await lazyCom(() => import('./pages/demo/index')),
    },
    {
      path: '/d/:id',
      component: await lazyCom(() => import('./pages/demo/did')),
    },
    {
      path: '/ssr',
      component: await lazyCom(() => import('./pages/demo/ssr')),
    },
    {
      path: '/styleTest',
      component: await lazyCom(() => import('./pages/demo/styleTest')),
    },
    {
      path: '/lazy',
      component: lazy (() => import('./pages/demo/index')),
    },
    // {
    //   path: '/spa',
    //   component: lazy(() => import('./pages/demo/layout')),
    //   children: [
    //     {
    //       path: '/',
    //       // component: lazy(() => import('../pages/demo')),
    //       component: () => (<KeepAlive id="spa/demo"><Dynamic component={lazy(() => import('./pages/demo'))} /></KeepAlive>),
    //     },
    //     {
    //       path: '/data',
    //       component: lazy(() => import('./pages/demo/fetchData')),
    //       // component: () => (<KeepAlive id="spa/data"><Dynamic component={lazy(() => import('../pages/demo/fetchData'))} /></KeepAlive>),
    //     },

    //   ],
    // },
    {
      path: '*p404',
      component: Page404,
    },
  ] satisfies IAyncRoute[]
}
